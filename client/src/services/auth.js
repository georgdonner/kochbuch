import api from './api';

export const checkAuth = async () => {
  const { ok } = await api.get('/auth', {
    fullResponse: true,
  });
  return ok;
};

export const getUser = async () => api.get('/user');
