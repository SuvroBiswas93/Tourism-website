import { configureStore } from '@reduxjs/toolkit';
import destinationsReducer from './destinationsSlice';
import { authSlice } from './authentication.slice';

export const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
    authentication: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;