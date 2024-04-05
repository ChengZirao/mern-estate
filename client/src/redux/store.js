import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: { user: userReducer },
  // Need to add this otherwise will get error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
