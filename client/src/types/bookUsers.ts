import { Book } from "./books";

export interface BookUser {
  id: number;
  userId: number;
  //user?: any; // To avoid circular import, can be improved
  bookId: number;
  book?: Book;
  borrowDate: string;
  returnDate: string;
  actualReturnDate?: string;
  status: "active" | "completed" | "cancelled";
  canModify: boolean;
  isActiveForUser: boolean;
}

export interface BookUsersState {
  activeBookUsers: BookUser[];
  bookUserHistory: BookUser[];
  selectedBookUser: BookUser | null;
  loading: boolean;
  error: string | null;
}
