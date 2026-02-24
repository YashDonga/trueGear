import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
  locale: string;
}

export const BASE_CURRENCY = "INR";

export const CURRENCIES: CurrencyOption[] = [
  { code: "INR", symbol: "₹", label: "Indian Rupee (₹)", locale: "en-IN" },
  { code: "USD", symbol: "$", label: "US Dollar ($)", locale: "en-US" },
  { code: "EUR", symbol: "€", label: "Euro (€)", locale: "de-DE" },
  { code: "GBP", symbol: "£", label: "British Pound (£)", locale: "en-GB" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham (د.إ)", locale: "ar-AE" },
];

export interface TaxConfig {
  label: string;
  percentage: number;
}

const CURRENCY_TAX_MAP: Record<string, TaxConfig> = {
  INR: { label: "GST", percentage: 18 },
  AED: { label: "VAT", percentage: 5 },
  USD: { label: "Tax", percentage: 10 },
  EUR: { label: "VAT", percentage: 20 },
  GBP: { label: "VAT", percentage: 20 },
};

const STORAGE_KEY = "truegear_currency";
const RATES_STORAGE_KEY = "truegear_exchange_rates";
const RATES_TTL = 60 * 60 * 1000; // 1 hour cache

interface CachedRates {
  rates: Record<string, number>;
  fetchedAt: number;
}

function getInitialCurrency(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || "INR";
  } catch {
    return "INR";
  }
}

function getCachedRates(): Record<string, number> | null {
  try {
    const raw = localStorage.getItem(RATES_STORAGE_KEY);
    if (!raw) return null;
    const cached: CachedRates = JSON.parse(raw);
    if (Date.now() - cached.fetchedAt < RATES_TTL) {
      return cached.rates;
    }
    return null;
  } catch {
    return null;
  }
}

function saveCachedRates(rates: Record<string, number>) {
  try {
    const cached: CachedRates = { rates, fetchedAt: Date.now() };
    localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify(cached));
  } catch {
    // ignore
  }
}

interface CurrencyContextValue {
  currency: string;
  setCurrency: (code: string) => void;
  formatCurrency: (amount: number) => string;
  currencyOption: CurrencyOption;
  taxConfig: TaxConfig;
  ratesLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState(getInitialCurrency);
  const [rates, setRates] = useState<Record<string, number>>(() => getCachedRates() || {});
  const [ratesLoading, setRatesLoading] = useState(false);

  const currencyOption = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const taxConfig = CURRENCY_TAX_MAP[currency] || { label: "Tax", percentage: 10 };

  // Fetch exchange rates from free API
  useEffect(() => {
    const cached = getCachedRates();
    if (cached) {
      setRates(cached);
      return;
    }

    let cancelled = false;
    setRatesLoading(true);

    fetch(`https://api.exchangerate-api.com/v4/latest/${BASE_CURRENCY}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.rates) {
          setRates(data.rates);
          saveCachedRates(data.rates);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch exchange rates:", err);
      })
      .finally(() => {
        if (!cancelled) setRatesLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const setCurrency = useCallback((code: string) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  }, []);

  const formatCurrency = useCallback(
    (amount: number) => {
      return new Intl.NumberFormat(currencyOption.locale, {
        style: "currency",
        currency: currencyOption.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount);
    },
    [currencyOption]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, currencyOption, taxConfig, ratesLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
