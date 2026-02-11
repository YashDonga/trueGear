import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'gradient' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  gradient?: {
    from: string;
    to: string;
    direction?: 'to-r' | 'to-b' | 'to-l' | 'to-t' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
  };
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  gradient,
  icon,
  className = '', 
  ...rest 
}) => {
  
  const getBaseStyles = () => {
    return 'flex items-center justify-center gap-2 h-12 sm:h-12.5 rounded-[10px] font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        const direction = gradient?.direction ? `-${gradient.direction}` : '';
        return gradient 
          ? `bg-linear${direction} from-[${gradient.from}] to-[${gradient.to}] text-white shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)] hover:opacity-90`
          : 'bg-linear-to-b from-[#ff4f31] to-[#fe2b73] text-white shadow-[2px_4px_8px_0px_rgba(0,0,0,0.15)] hover:opacity-90';
      case 'secondary':
        return 'bg-[#0066FF] text-white hover:bg-[#0052cc]';
      case 'outline':
        return 'border-2 border-[#EBEBEB] text-[#808080] bg-transparent hover:bg-[#fff]';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  const getResponsiveStyles = () => {
    return variant === 'gradient' 
      ? 'w-full md:w-auto px-6 sm:px-8' 
      : ' px-5 sm:px-6';
  };

  return (
    <button 
      className={`${getBaseStyles()} ${getVariantStyles()} ${getResponsiveStyles()} ${className} cursor-pointer`}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;

