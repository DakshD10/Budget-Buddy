import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../Features/Transaction/AddTransSlice";

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

export default store;
