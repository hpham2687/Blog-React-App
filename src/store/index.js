import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "store/reducers";

export const store = configureStore({
  reducer: rootReducer,
});
