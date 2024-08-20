import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "../slices/blogSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    blog: blogSlice,
  },
  // Add any middleware here
});

export default store;
