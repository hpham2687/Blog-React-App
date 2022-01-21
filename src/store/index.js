import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "store/slice";

export const store = configureStore({
  reducer: rootReducer,
});
