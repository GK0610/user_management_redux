import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Stores the signed-up user details
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      state.user = action.payload; // Save user details
    },
    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
