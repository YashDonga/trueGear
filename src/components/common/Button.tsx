import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button {...rest} style={{ padding: '8px 12px', borderRadius: 6 }}>
      {children}
    </button>
  );
};

export default Button;
