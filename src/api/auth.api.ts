import api from './axios';

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const register = async (payload: { name: string; email: string; password: string }) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};
