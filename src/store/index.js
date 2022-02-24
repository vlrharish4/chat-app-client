import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    room: null,
    name: null,
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.room = action.payload.room;
      state.name = action.payload.name;
    },
    reset: (state) => {
      state.isAuthenticated = false;
      state.room = null;
      state.name = null;
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export const authActions = authSlice.actions;

export default store;
