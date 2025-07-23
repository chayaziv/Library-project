import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import packagesSlice from "./slices/packagesSlice";
import booksSlice from "./slices/booksSlice";
import bookUsersSlice from "./slices/bookUsersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    packages: packagesSlice,
    books: booksSlice,
    bookUsers: bookUsersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
