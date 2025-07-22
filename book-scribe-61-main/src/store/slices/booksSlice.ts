import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  name?: string;
  author?: string;
  categoryId: number;
  category?: Category;
  isActive: boolean;
}

interface BooksState {
  books: Book[];
  filteredBooks: Book[];
  selectedCategory: string;
  loading: boolean;
}

const initialState: BooksState = {
  books: [
    {
      id: 1,
      name: "Murder on the Orient Express",
      author: "Agatha Christie",
      categoryId: 1,
      category: { id: 1, name: "Thriller" },
      isActive: true,
    },
    {
      id: 2,
      name: "The Da Vinci Code",
      author: "Dan Brown",
      categoryId: 1,
      category: { id: 1, name: "Thriller" },
      isActive: true,
    },
    {
      id: 3,
      name: "Spider-Man: New Beginnings",
      author: "Stan Lee",
      categoryId: 2,
      category: { id: 2, name: "Comics" },
      isActive: true,
    },
    {
      id: 4,
      name: "Batman: Year One",
      author: "Frank Miller",
      categoryId: 2,
      category: { id: 2, name: "Comics" },
      isActive: true,
    },
    {
      id: 5,
      name: "Pride and Prejudice",
      author: "Jane Austen",
      categoryId: 3,
      category: { id: 3, name: "Romance" },
      isActive: true,
    },
    {
      id: 6,
      name: "The Notebook",
      author: "Nicholas Sparks",
      categoryId: 3,
      category: { id: 3, name: "Romance" },
      isActive: true,
    },
  ],
  filteredBooks: [],
  selectedCategory: "All",
  loading: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
      state.filteredBooks = action.payload;
    },
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
    updateBookAvailability: (
      state,
      action: PayloadAction<{ bookId: number; isActive: boolean }>
    ) => {
      const book = state.books.find((b) => b.id === action.payload.bookId);
      if (book) {
        book.isActive = action.payload.isActive;
      }
      const filteredBook = state.filteredBooks.find(
        (b) => b.id === action.payload.bookId
      );
      if (filteredBook) {
        filteredBook.isActive = action.payload.isActive;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setBooks,
  filterByCategory,
  updateBookAvailability,
  setLoading,
} = booksSlice.actions;
export default booksSlice.reducer;
