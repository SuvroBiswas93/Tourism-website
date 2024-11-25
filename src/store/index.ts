import { configureStore } from '@reduxjs/toolkit';
import destinationsReducer from './destinationsSlice';

export const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;