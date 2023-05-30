import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import libraryReducer from "./librarySlice";

export default configureStore({
  reducer: {
    account: accountReducer,
    library: libraryReducer,
  },
});
