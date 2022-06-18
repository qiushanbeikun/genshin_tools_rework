import axios from 'axios';
import store from '../store';
import authSlice from '../store/slices/auth';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const axiosService = axios;
// export const axiosService = axios.create({
//   headers: {
//     'content-Type': 'application/json',
//   },
// });

axiosService.interceptors.request.use(async (config) => {
  const { token } = store?.getState?.()?.auth;
  if (token !== null) {
    config.headers.Authorization = 'Bearer ' + token;
    console.debug('[Request]', config.baseURL + config.url, JSON.stringify(token));
  }
  return config;
});

// axiosService.interceptors.response.use(
//   (res) => {
//     console.debug('[Response]', res.config.baseURL + res.config.url, res.status, res.data);
//     return res;
//   },
//   (err) => {
//     console.debug(
//       '[Response]',
//       err.config.baseURL + err.config.url,
//       err.response.status,
//       err.response.data
//     );
//     return Promise.reject(err);
//   }
// );

const refreshAuth = async (failedRequest) => {
  console.log('Token expired, refresh');
  const { refreshToken } = store.getState().auth;
  if (refreshToken !== null) {
    try {
      const res = await axios.post('/api/auth/refresh/', { refresh: refreshToken });
      const { access, refresh } = res.data;
      failedRequest.response.config.headers.Authorization = 'Bearer ' + access;
      store.dispatch(authSlice.actions.setAuthTokens({ token: access, refreshToken: refresh }));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        store.dispatch(authSlice.actions.setLogout());
      } else {
        console.error('Failed to refresh');
      }
    }
  }
};

createAuthRefreshInterceptor(axiosService, refreshAuth);

export async function fetcher(url) {
  try {
    await axiosService.post(url, { token: store.getState().auth.token });
  } catch (e) {
    // don't care
  }
}
