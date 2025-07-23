import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, AuthState } from "../../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5130/api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const res = await axios.post<User>(`${BASE_URL}/user/login`, credentials);
    return res.data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    const res = await axios.post<User>(`${BASE_URL}/user/register`, userData);
    return res.data;
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (userId: number) => {
    const res = await axios.get<User>(`${BASE_URL}/users/${userId}`);
    return res.data;
  }
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת התחברות";
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת הרשמה";
      })
      // Fetch profile cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת שליפת פרטי משתמש";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
