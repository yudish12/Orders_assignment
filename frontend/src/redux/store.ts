import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducers from '../redux/slices/AuthSlice';
import productReducers from '../redux/slices/ProductSlice';

export const store = configureStore({
    reducer: { authReducers,productReducers },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export const useAppSlector: TypedUseSelectorHook<RootState> = useSelector
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch