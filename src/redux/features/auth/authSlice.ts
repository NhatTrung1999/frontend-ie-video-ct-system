import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAuth } from "../../../services/authService";

interface AuthState {
  user: any;
  token: string;
  loading: boolean;
  error: any;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  token: localStorage.getItem("access_token") || "",
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credential: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginAuth(
        credential.username,
        credential.password
      );
      localStorage.setItem("access_token", response?.access_token);
      localStorage.setItem("user", JSON.stringify(response?.user));
      return response;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response.data?.message || "An error occurred",
        error: error.response.data?.error,
        code: error.response.data?.statusCode,
      });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = "";
      state.error = null;
      state.loading = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      localStorage.removeItem("paths");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
