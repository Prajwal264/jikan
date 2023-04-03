/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken } from '../helpers/token.helper';
const wrapTokenMiddleware = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: any) => {
      const token = getAccessToken();
      if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error: Error) => {
      return Promise.reject(error);
    },
  );


  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await refreshAccessToken();
            const { accessToken } = rs.data;
            setAccessToken(accessToken);
            instance.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
            return instance(originalConfig);
          } catch (_error: any) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }
        if (err.response.status === 401 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    },
  );

  function refreshAccessToken() {
    const accessToken = getAccessToken();
    return axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/refreshtoken`,
      {
        refreshToken: getRefreshToken(),
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
  return instance;
};

export { wrapTokenMiddleware };
