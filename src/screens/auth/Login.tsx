import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // wire up auth.login
    console.log('login', { email, password });
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default Login;
