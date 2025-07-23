import { Category } from "./common";

export interface Package {
  id: number;
  pointCount: number;
  name: string;
  price: number;
  categoryId: number;
  category: Category;
}

export interface PackageUser {
  id: number;
  userId: number;
  packageId: number;
  package?: Package;
  isActive: boolean;
  remainingPoints: number;
  purchaseDate: string;
}

export interface PackagesState {
  availablePackages: Package[];
  userPackages: PackageUser[];
  activePackage: PackageUser | null;
  selectedPackage: Package | null;
  loading: boolean;
  error: string | null;
  purchasingPackageId: string | null;
}
