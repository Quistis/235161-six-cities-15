import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthorizationStatus, NameSpace } from '../../const';

type AuthorizationSliceType = {
  authStatus: AuthorizationStatus;
  authErrorStatus: boolean;
}

const initialState: AuthorizationSliceType = {
  authStatus: AuthorizationStatus.Unknown,
  authErrorStatus: false,
};

export const authorizationSlice = createSlice({
  name: NameSpace.Authorization,
  initialState,
  reducers: {
    // changeAuthStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
    //   state.authStatus = action.payload;
    // },
    // changeAuthErrorStatus: (state, action: PayloadAction<boolean>) => {
    //   state.authErrorStatus = action.payload;
    // }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(loginAction.fulfilled, (state) => {
        state.authErrorStatus = false;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authErrorStatus = true;
        state.authStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const authorizationReducer = authorizationSlice.reducer;

