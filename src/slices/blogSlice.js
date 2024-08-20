import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlog: (state, action) => {
      state.blogs = action.payload;
    },
    addBlog: (state, action) => {
      state.blogs = [...state.blogs, action.payload];
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    updateBlog: (state, action) => {
      state.blogs = state.blogs.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
  },
});

export const { getBlog, addBlog, deleteBlog, updateBlog } = blogSlice.actions;

export default blogSlice.reducer;
