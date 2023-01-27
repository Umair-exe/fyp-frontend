import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  user: false,
  error: null,
  token: null || localStorage.getItem("access_token"),
  isLoading: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    start: (state) => {
      state.isLoading = true;
    },
    stop: (state) => {
      state.isLoading = false;
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action?.payload?.token;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("access_token");
      state.token = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError, start, stop, setUser } =
  appSlice.actions;

export default appSlice.reducer;
