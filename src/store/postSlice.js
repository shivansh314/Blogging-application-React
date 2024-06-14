// store/postsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import service from '../appwrite/config'

// Thunks
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await service.createPost(postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ slug, postData }, { rejectWithValue }) => {
    try {
      const response = await service.updatePost(slug, postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await service.deletePost(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPost = createAsyncThunk(
  'posts/getPost',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await service.getPost(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (queries, { rejectWithValue }) => {
    try {
      const response = await service.getPosts(queries);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {

  },
   
  reducers: {},

});

export default postsSlice.reducer;
