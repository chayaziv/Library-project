import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Book, BookUser, BookUsersState, BorrowRequestDto } from "../../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5130/api";

export const fetchActiveBookUsers = createAsyncThunk(
  "bookUsers/fetchActive",
  async (userId: number) => {
    const res = await axios.get<BookUser[]>(
      `${BASE_URL}/users/${userId}/bookUser/active`
    );
    return res.data;
  }
);

export const fetchBookUserHistory = createAsyncThunk(
  "bookUsers/fetchHistory",
  async (userId: number) => {
    const res = await axios.get<BookUser[]>(
      `${BASE_URL}/users/${userId}/bookUser/history`
    );
    return res.data;
  }
);

export const createBookUser = createAsyncThunk(
  "bookUsers/create",
  async (borrowRequest: BorrowRequestDto) => {
    const res = await axios.post<BookUser>(
      `${BASE_URL}/bookUser`,
      borrowRequest
    );
    return res.data;
  }
);

export const updateBookUser = createAsyncThunk(
  "bookUsers/update",
  async ({
    bookUserId,
    returnDate,
  }: {
    bookUserId: number;
    returnDate: string;
  }) => {
    const res = await axios.put<BookUser>(
      `${BASE_URL}/bookUser/${bookUserId}`,
      {
        returnDate,
      }
    );
    return res.data;
  }
);

export const cancelBookUser = createAsyncThunk(
  "bookUsers/cancel",
  async (bookUserId: number) => {
    const res = await axios.put<BookUser>(
      `${BASE_URL}/bookUser/${bookUserId}/cancel`
    );
    return res.data;
  }
);

export const completeBookUser = createAsyncThunk(
  "bookUsers/complete",
  async (bookUserId: number) => {
    const res = await axios.put<BookUser>(
      `${BASE_URL}/bookUser/${bookUserId}/complete`
    );
    return res.data;
  }
);

export const fetchBookUserById = createAsyncThunk(
  "bookUsers/fetchById",
  async (bookUserId: number) => {
    const res = await axios.get<BookUser>(`${BASE_URL}/bookUser/${bookUserId}`);
    return res.data;
  }
);

const initialState: BookUsersState = {
  activeBookUsers: [],
  bookUserHistory: [],
  selectedBookUser: null,
  loading: false,
  error: null,
};

const bookUsersSlice = createSlice({
  name: "bookUsers",
  initialState,
  reducers: {
    clearSelectedBookUser: (state) => {
      state.selectedBookUser = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    addBookUser: (state, action: PayloadAction<BookUser>) => {
      state.activeBookUsers.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch active book users cases
      .addCase(fetchActiveBookUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveBookUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.activeBookUsers = action.payload;
      })
      .addCase(fetchActiveBookUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת שליפת השאלות פעילות";
      })
      // Fetch book user history cases
      .addCase(fetchBookUserHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookUserHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.bookUserHistory = action.payload;
      })
      .addCase(fetchBookUserHistory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "שגיאה בעת שליפת היסטוריית השאלות";
      })
      // Create book user cases
      .addCase(createBookUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBookUser.fulfilled, (state, action) => {
        state.loading = false;
        state.activeBookUsers.push(action.payload);
      })
      .addCase(createBookUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת יצירת השאלה";
      })
      // Update book user cases
      .addCase(updateBookUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBookUser = action.payload;
        const index = state.activeBookUsers.findIndex(
          (b) => b.id === updatedBookUser.id
        );
        if (index !== -1) {
          state.activeBookUsers[index] = updatedBookUser;
        }
        if (state.selectedBookUser?.id === updatedBookUser.id) {
          state.selectedBookUser = updatedBookUser;
        }
      })
      .addCase(updateBookUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת עדכון השאלה";
      })
      // Cancel book user cases
      .addCase(cancelBookUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBookUser.fulfilled, (state, action) => {
        state.loading = false;
        const cancelledBookUser = action.payload;
        state.activeBookUsers = state.activeBookUsers.filter(
          (b) => b.id !== cancelledBookUser.id
        );
        state.bookUserHistory.push(cancelledBookUser);
        if (state.selectedBookUser?.id === cancelledBookUser.id) {
          state.selectedBookUser = null;
        }
      })
      .addCase(cancelBookUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת ביטול השאלה";
      })
      // Complete book user cases
      .addCase(completeBookUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeBookUser.fulfilled, (state, action) => {
        state.loading = false;
        const completedBookUser = action.payload;
        state.activeBookUsers = state.activeBookUsers.filter(
          (b) => b.id !== completedBookUser.id
        );
        state.bookUserHistory.push(completedBookUser);
        if (state.selectedBookUser?.id === completedBookUser.id) {
          state.selectedBookUser = null;
        }
      })
      .addCase(completeBookUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת השלמת השאלה";
      })
      // Fetch book user by ID cases
      .addCase(fetchBookUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedBookUser = null;
      })
      .addCase(fetchBookUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBookUser = action.payload;
      })
      .addCase(fetchBookUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת שליפת השאלה";
        state.selectedBookUser = null;
      });
  },
});

export const { clearSelectedBookUser, clearError } = bookUsersSlice.actions;

// Add missing functions that are used in components
export const addBookUser = (bookUser: BookUser) => ({
  type: "bookUsers/addBookUser",
  payload: bookUser,
});

export default bookUsersSlice.reducer;
