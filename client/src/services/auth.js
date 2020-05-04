export const checkAuth = async () => {
  const { ok } = await fetch('/api/auth', {
    credentials: 'include',
  });
  return ok;
};

export const getUser = async () => {
  const res = await fetch('/api/user', {
    credentials: 'include',
  });
  return res.json();
};
