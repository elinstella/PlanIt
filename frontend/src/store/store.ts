import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Typ för Redux State
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
