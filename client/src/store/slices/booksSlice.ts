import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Book, BooksState } from "../../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5130/api";

export const fetchBooks = createAsyncThunk("books/fetchAll", async () => {
  const res = await axios.get<Book[]>(`${BASE_URL}/books/getall`);
  return res.data;
});

export const fetchBookById = createAsyncThunk(
  "books/fetchById",
  async (id: number) => {
    const res = await axios.get<Book>(`${BASE_URL}/books/${id}`);
    return res.data;
  }
);

export const fetchCategories = createAsyncThunk(
  "books/fetchCategories",
  async () => {
    const res = await axios.get<Category[]>(`${BASE_URL}/category/getall`);
    return res.data;
  }
);

export const updateBookStatus = createAsyncThunk(
  "books/updateStatus",
  async ({ bookId, isActive }: { bookId: number; isActive: boolean }) => {
    const res = await axios.put<Book>(`${BASE_URL}/books/${bookId}/status`, {
      isActive,
    });
    return res.data;
  }
);

const initialState: BooksState = {
  books: [],
  filteredBooks: [],
  categories: [],
  selectedCategory: "All",
  selectedBook: null,
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      if (action.payload === "All") {
        state.filteredBooks = state.books;
      } else {
        state.filteredBooks = state.books.filter(
          (book) => book.category?.name === action.payload
        );
      }
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateBookAvailability: (
      state,
      action: PayloadAction<{ bookId: number; isActive: boolean }>
    ) => {
      const { bookId, isActive } = action.payload;
      const bookIndex = state.books.findIndex((book) => book.id === bookId);
      if (bookIndex !== -1) {
        state.books[bookIndex].isActive = isActive;
      }
      const filteredIndex = state.filteredBooks.findIndex(
        (book) => book.id === bookId
      );
      if (filteredIndex !== -1) {
        state.filteredBooks[filteredIndex].isActive = isActive;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch books cases
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        state.filteredBooks = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת שליפת ספרים";
      })
      // Fetch book by ID cases
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedBook = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת שליפת ספר";
        state.selectedBook = null;
      })
      // Fetch categories cases
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת שליפת קטגוריות";
      })
      // Update book status cases
      .addCase(updateBookStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBook = action.payload;
        const bookIndex = state.books.findIndex(
          (book) => book.id === updatedBook.id
        );
        if (bookIndex !== -1) {
          state.books[bookIndex] = updatedBook;
        }
        const filteredIndex = state.filteredBooks.findIndex(
          (book) => book.id === updatedBook.id
        );
        if (filteredIndex !== -1) {
          state.filteredBooks[filteredIndex] = updatedBook;
        }
        if (state.selectedBook?.id === updatedBook.id) {
          state.selectedBook = updatedBook;
        }
      })
      .addCase(updateBookStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת עדכון סטטוס ספר";
      });
  },
});

export const { filterByCategory, clearSelectedBook, clearError } =
  booksSlice.actions;

// Add missing functions that are used in components
export const updateBookAvailability = ({
  bookId,
  isActive,
}: {
  bookId: number;
  isActive: boolean;
}) => ({
  type: "books/updateBookAvailability",
  payload: { bookId, isActive },
});

export default booksSlice.reducer;
