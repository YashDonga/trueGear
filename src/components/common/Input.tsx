import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

const Input: React.FC<Props> = ({ label, ...rest }) => (
  <label style={{ display: 'block', marginBottom: 8 }}>
    {label && <span style={{ display: 'block', marginBottom: 4 }}>{label}</span>}
    <input {...rest} style={{ padding: 8, borderRadius: 4, width: '100%' }} />
  </label>
);

export default Input;
