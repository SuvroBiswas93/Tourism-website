import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for the state and action payloads
interface AuthState {
  loading: boolean;
  logged: boolean;
  user: User | null; // Replace `User` with your specific type or leave as-is for a generic object
  error: string | null;
}

// Define initial state type
const initialState: AuthState = {
  loading: true,
  logged: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User | null; error: string | null }>
    ) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = action.payload.error;
      state.logged = false;
      if(action.payload.user) {
        state.logged = true
      }
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading, setUser } = authSlice.actions;
export default authSlice.reducer;

// Define a placeholder User type (replace or expand as needed)
interface User {
  uid: string,
  displayName: string,
  profileImage: string,
}

