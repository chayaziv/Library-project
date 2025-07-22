import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "./booksSlice";

export interface BookUser {
  id: number;
  userId: number;
  user?: any; // To avoid circular import, can be improved
  bookId: number;
  book?: Book;
  isActiveForUser: boolean;
}

export interface Borrow {
  id: string;
  userId: string;
  bookId: string;
  book: Book;
  borrowDate: string;
  returnDate: string;
  actualReturnDate?: string;
  status: "active" | "completed" | "cancelled";
  canModify: boolean;
}

interface BorrowsState {
  activeBorrows: Borrow[];
  borrowHistory: Borrow[];
  loading: boolean;
}

const initialState: BorrowsState = {
  activeBorrows: [],
  borrowHistory: [],
  loading: false,
};

const borrowsSlice = createSlice({
  name: "borrows",
  initialState,
  reducers: {
    setActiveBorrows: (state, action: PayloadAction<Borrow[]>) => {
      state.activeBorrows = action.payload;
    },
    setBorrowHistory: (state, action: PayloadAction<Borrow[]>) => {
      state.borrowHistory = action.payload;
    },
    addBorrow: (state, action: PayloadAction<Borrow>) => {
      state.activeBorrows.push(action.payload);
    },
    updateBorrow: (state, action: PayloadAction<Borrow>) => {
      const index = state.activeBorrows.findIndex(
        (b) => b.id === action.payload.id
      );
      if (index !== -1) {
        state.activeBorrows[index] = action.payload;
      }
    },
    cancelBorrow: (state, action: PayloadAction<string>) => {
      const borrow = state.activeBorrows.find((b) => b.id === action.payload);
      if (borrow) {
        borrow.status = "cancelled";
        state.borrowHistory.push({ ...borrow });
        state.activeBorrows = state.activeBorrows.filter(
          (b) => b.id !== action.payload
        );
      }
    },
    completeBorrow: (state, action: PayloadAction<string>) => {
      const borrow = state.activeBorrows.find((b) => b.id === action.payload);
      if (borrow) {
        borrow.status = "completed";
        borrow.actualReturnDate = new Date().toISOString();
        state.borrowHistory.push({ ...borrow });
        state.activeBorrows = state.activeBorrows.filter(
          (b) => b.id !== action.payload
        );
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setActiveBorrows,
  setBorrowHistory,
  addBorrow,
  updateBorrow,
  cancelBorrow,
  completeBorrow,
  setLoading,
} = borrowsSlice.actions;

export default borrowsSlice.reducer;
