import { Category } from "./common";

export interface Book {
  id: number;
  name?: string;
  author?: string;
  categoryId: number;
  category?: Category;
  isActive: boolean;
}

export interface BooksState {
  books: Book[];
  filteredBooks: Book[];
  categories: Category[];
  selectedCategory: string;
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
}
