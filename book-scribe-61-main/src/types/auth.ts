import { BookUser } from "./bookUsers";
import { PackageUser } from "./packages";


export interface User {
  id: number;
  name: string;
  password: string;
  email?: string;
  phone?: string;
  packageUsers?: PackageUser[];
  booksUser?: BookUser[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
