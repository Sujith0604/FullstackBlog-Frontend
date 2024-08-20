import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null, // User object with properties like id, name, email, etc.  // Add more properties as needed. For example, roles, permissions, etc.  // If user is not null, include their details here.  // If user is null, don't include any user details.  // This will help us to track the authenticated user in our application.  // This is a simple example, you can add more properties and functionalities according to your requirements.  // For example, you might want to store user's recent activity, favorite posts, etc.  // You might also want to store user's preferences, settings, etc.  // The state should be updated only when the user logs in or logs out.  // You might want to consider using a library like Redux Toolkit to simplify the state management.  // For example, you could use createSlice to manage the state and actions for the user slice.  //
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLoggedIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    isLoggedOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { isLoggedIn, isLoggedOut } = userReducer.actions;

export default userReducer.reducer;
