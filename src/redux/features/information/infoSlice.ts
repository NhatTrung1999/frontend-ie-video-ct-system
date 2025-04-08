import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";

interface InfoState {
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: InfoState = {
  loading: false,
  error: null,
  success: false,
};

export const submitInfo = createAsyncThunk(
  "info/submitInfo",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/info/submit-info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitInfo.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default infoSlice.reducer;
