import { configureStore } from "@reduxjs/toolkit";
import pinReducer from "./pinSlice";

export const store = configureStore({
  reducer: {
    pin: pinReducer,
  },
});
