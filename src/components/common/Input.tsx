import React, { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

const Input = forwardRef<HTMLInputElement, Props>(({ label, ...rest }, ref) => (
  <label style={{ display: 'block', width: "100%" }}>
    {label && <span style={{ display: 'block', marginBottom: 4 }}>{label}</span>}
    <input ref={ref} {...rest} style={{ padding: 8, borderRadius: 4, width: '100%' }} />
  </label>
));

Input.displayName = "Input";

export default Input;

