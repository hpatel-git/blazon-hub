import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { saleseazeApi } from '../api/saleseazeApi';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    [saleseazeApi.reducerPath]: saleseazeApi.reducer,
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saleseazeApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
