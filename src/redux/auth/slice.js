import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, refreshUser, registerUser } from './operations.js';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: false,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = false;
};

const handleRejected = state => {
  state.isLoading = false;
  state.error = true;
};

function handleUserData(state, action) {
  state.isLoading = false;
  state.error = false;
  state.user.name = action.payload.user.name;
  state.user.email = action.payload.user.email;
  state.token = action.payload.token;
  state.isLoggedIn = true;
}

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleUserData)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleUserData)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = false;
        state.isRefreshing = false;
      })
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = true;
      });
  },
  selectors: {
    selectUserName: state => state.user.name,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
    selectIsLoggedIn: state => state.isLoggedIn,
    token: state => state.token,
  },
});
export const { token, selectUserName, selectIsLoading, selectError, selectIsLoggedIn } =
  slice.selectors;
export const authReducer = slice.reducer;
