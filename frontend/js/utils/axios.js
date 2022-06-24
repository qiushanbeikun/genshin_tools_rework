import axios from 'axios';
import store from '../store';
import authSlice from '../store/slices/auth';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const axiosService = axios.create();
// export const axiosService = axios.create({
//   headers: {
//     'content-Type': 'application/json',
//   },
// });

axiosService.interceptors.request.use(async (config) => {
  const { token } = store?.getState?.()?.auth;
  if (token !== null) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

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
      console.log('error caught', err);
      store.dispatch(authSlice.actions.logout());
      console.log('error caught2');
      localStorage.clear();
      window.location.refresh();
      // if (err.response && err.response.status === 401) {
      //   console.log('Refresh token expired, force logout.');
      //
      // } else {
      //   console.error('Failed to refresh');
      // }
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
