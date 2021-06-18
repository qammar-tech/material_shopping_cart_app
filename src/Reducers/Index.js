import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../config/axios';

const initialState = {
  initialValue: 0,
  name: 'qammar raza',
  fetching: false
}

export const getTasks = createAsyncThunk('/test', async (values, thunkAPI) => {
  try {
    const response = await axios.get('/v1/products');
    return response.data
  } catch (error) {
    console.log('this is the error: ', { error })

    return thunkAPI.rejectWithValue({
      err: error.response.data.message,
      status: error.response.status
    })
  }
})

const indexReducer = createSlice({
  name: 'initialReducer',
  initialState,
  reducers: {
    increment(state) {
      state.initialValue++
    },
    decrement(state) {
      state.initialValue--;
    }
  },
  extraReducers: {
    [getTasks.pending]: (state, action) => {
      return {
        ...state,
        fetching: true
      }
    },
    [getTasks.fulfilled]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        fetching: false
      }
    },
    [getTasks.rejected]: (state, action) => {
      return {
        ...state,
        fetching: false,
      }
    }
  }
});


export const { increment, decrement } = indexReducer.actions;
export default indexReducer.reducer;