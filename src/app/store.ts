import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postSlice';

export const store = configureStore({
  reducer: combineReducers({
    posts: postsReducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
