import cookie from '../services/cookie.service';

export const getAccessToken = () => {
  const accessToken = cookie.get('accessToken');
  return accessToken;
};

export const setAccessToken = (token: string) => {
  cookie.set('accessToken', token);
};

export const removeAccessToken = () => {
  cookie.delete('accessToken');
};

export const getRefreshToken = () => {
  const refreshToken = cookie.get('refreshToken');
  return refreshToken;
};

export const setRefreshToken = (token: string) => {
  cookie.set('refreshToken', token);
};

export const removeRefreshToken = () => {
  cookie.delete('refreshToken');
};
