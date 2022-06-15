// @flow
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {AccountResponse, AccountUpdate} from "../types/types";

type State = {
  token: string | null;
  refreshToken: string | null;
  account: AccountResponse | null;
};

const initialState = { token: null, refreshToken: null, account: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(
      state: State,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
    },
    setAccount(state: State, action: PayloadAction<AccountResponse>) {
      state.account = action.payload;
    },
    logout(state: State) {
      state.account = null;
      state.refreshToken = null;
      state.token = null;
    },
    // updateAccount(state: State, action:PayloadAction<AccountUpdate>) {
    //   state.account.user = action.payload.username;
    //   state.account.user.genshin_server = action.payload.genshin_server;
    //   state.account.user.genshin_uid = action.payload.genshin_uid;
    // }
  },
});

export default authSlice;
