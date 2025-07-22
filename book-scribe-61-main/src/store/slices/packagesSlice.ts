import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: number;
  name: string;
}

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
  user?: any; // To avoid circular import, can be improved
  packageId: number;
  package?: Package;
  isActive: boolean;
  remainingPoints: number;
  purchaseDate: string;
}

interface PackagesState {
  availablePackages: Package[];
  userPackages: PackageUser[];
  activePackage: PackageUser | null;
  loading: boolean;
  purchasingPackageId: string | null;
}

const initialState: PackagesState = {
  availablePackages: [
    {
      id: 1,
      pointCount: 5,
      name: "Basic Thriller Package",
      price: 99,
      categoryId: 1, // Assuming Thriller category has id 1
      category: { id: 1, name: "Thriller" },
    },
    {
      id: 2,
      pointCount: 10,
      name: "Extended Thriller Package",
      price: 179,
      categoryId: 1, // Assuming Thriller category has id 1
      category: { id: 1, name: "Thriller" },
    },
    {
      id: 3,
      pointCount: 8,
      name: "Comics Package",
      price: 149,
      categoryId: 2, // Assuming Comics category has id 2
      category: { id: 2, name: "Comics" },
    },
    {
      id: 4,
      pointCount: 6,
      name: "Romance Package",
      price: 119,
      categoryId: 3, // Assuming Romance category has id 3
      category: { id: 3, name: "Romance" },
    },
  ],
  userPackages: [],
  activePackage: null,
  loading: false,
  purchasingPackageId: null,
};

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setPackages: (state, action: PayloadAction<Package[]>) => {
      state.availablePackages = action.payload;
    },
    setUserPackages: (state, action: PayloadAction<PackageUser[]>) => {
      state.userPackages = action.payload;
      state.activePackage =
        action.payload.find((pkg) => pkg.isActive && pkg.remainingPoints > 0) ||
        null;
    },
    purchasePackageStart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.purchasingPackageId = action.payload;
    },
    purchasePackageSuccess: (state, action: PayloadAction<PackageUser>) => {
      state.userPackages.push(action.payload);
      state.activePackage = action.payload;
      state.loading = false;
      state.purchasingPackageId = null;
    },
    purchasePackageError: (state) => {
      state.loading = false;
      state.purchasingPackageId = null;
    },
    updateActivePackage: (state, action: PayloadAction<PackageUser>) => {
      state.activePackage = action.payload;
      const index = state.userPackages.findIndex(
        (pkg) => pkg.id === action.payload.id
      );
      if (index !== -1) {
        state.userPackages[index] = action.payload;
      }
    },
    decrementPackageBooks: (state) => {
      if (state.activePackage && state.activePackage.remainingPoints > 0) {
        state.activePackage.remainingPoints--;
        const index = state.userPackages.findIndex(
          (pkg) => pkg.id === state.activePackage!.id
        );
        if (index !== -1) {
          state.userPackages[index].remainingPoints--;
        }
      }
    },
  },
});

export const {
  setPackages,
  setUserPackages,
  purchasePackageStart,
  purchasePackageSuccess,
  purchasePackageError,
  updateActivePackage,
  decrementPackageBooks,
} = packagesSlice.actions;

export default packagesSlice.reducer;
