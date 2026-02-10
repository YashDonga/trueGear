import { useState, useEffect } from 'react';
import type { User } from '../types/user.types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('tg_user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem('tg_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tg_user');
  };

  return { user, login, logout } as const;
};

export default useAuth;
