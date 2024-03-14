import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userInfo: UserInfo | null;
}

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const initialState: AuthState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;

export const selectUserInfo = (state: { auth: AuthState }) => state.auth.userInfo;

export default authSlice.reducer;