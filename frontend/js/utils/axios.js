import axios from 'axios';
import store from "../store";
import authSlice from "../store/slices/auth";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const axiosService = axios.create({
  headers: {
    'content-Type': 'application/json',
  }
});

axiosService.interceptors.request.use(async (config) => {
  const token = store.getState().auth;

  if (token !== null) {
    config.headers.Authorization = 'Bearer' + token;
    console.debug('[Request]', config.baseURL + config.url, JSON.stringify(token));
  }
  return config;
})

axiosService.interceptors.response.use(
  (res) => {
    console.debug('[Response]', res.config.baseURL + res.config.url, res.status, res.data);
  },
  (err) => {
    console.debug(
      '[Response]',
      err.config.baseURL + err.config.url,
      err.response.status,
      err.response.data
    );
    return Promise.reject(err);
  }
)

const refreshAuth = async (failedRequest) => {
  const {refreshToken} = store.getState().auth;
  if (refreshToken !== null) {
    return axios.post("/api/auth/refresh/", {refresh: refreshToken})
      .then((res) => {
        const {access, refresh} = res.data;
        failedRequest.response.config.headers.Authentication = 'Bearer' + access;
        store.dispatch(
          authSlice.actions.setAuthTokens({token: access, refreshToken: refresh})
        )
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          store.dispatch(authSlice.actions.setLogout());
        }
      })
  }
}

createAuthRefreshInterceptor(axiosService, refreshAuth);

export function fetcher(url) {
  return axiosService.post(url, {token: store.getState().auth.token}).then((res) => res.data);
}
