import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Package, PackageUser, PackagesState } from "../../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5130/api";

export const fetchPackages = createAsyncThunk("packages/fetchAll", async () => {
  const res = await axios.get<Package[]>(`${BASE_URL}/package/getall`);
  return res.data;
});

export const fetchPackageById = createAsyncThunk(
  "packages/fetchById",
  async (id: number) => {
    const res = await axios.get<Package>(`${BASE_URL}/packages/${id}`);
    return res.data;
  }
);

export const fetchUserPackages = createAsyncThunk(
  "packages/fetchUserPackages",
  async (userId: number) => {
    const res = await axios.get<PackageUser[]>(
      `${BASE_URL}/user/${userId}/packages/?isActive=true`
    );
    return res.data;
  }
);

export const purchasePackage = createAsyncThunk(
  "packages/purchase",
  async ({ userId, packageId }: { userId: number; packageId: number }) => {
    const res = await axios.post<PackageUser>(
      `${BASE_URL}/user/${userId}/packages`,
      { packageId }, // Send as object with packageId property
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const updatePackagePoints = createAsyncThunk(
  "packages/updatePoints",
  async ({
    packageUserId,
    remainingPoints,
  }: {
    packageUserId: number;
    remainingPoints: number;
  }) => {
    const res = await axios.put<PackageUser>(
      `${BASE_URL}/package-users/${packageUserId}/points`,
      { remainingPoints }
    );
    return res.data;
  }
);

// New function to decrement package points on the server
export const decrementPackagePoints = createAsyncThunk(
  "packages/decrementPoints",
  async (packageUserId: number) => {
    const res = await axios.put<PackageUser>(
      `${BASE_URL}/package-users/${packageUserId}/decrement`,
      {}
    );
    return res.data;
  }
);

const initialState: PackagesState = {
  availablePackages: [],
  userPackages: [],
  activePackage: null,
  selectedPackage: null,
  loading: false,
  error: null,
  purchasingPackageId: null,
};

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    clearSelectedPackage: (state) => {
      state.selectedPackage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    purchasePackageStart: (state, action: PayloadAction<string>) => {
      state.purchasingPackageId = action.payload;
      state.loading = true;
      state.error = null;
    },
    purchasePackageSuccess: (state, action: PayloadAction<PackageUser>) => {
      state.purchasingPackageId = null;
      state.loading = false;
      state.userPackages.push(action.payload);
      // Update active package to the newly purchased one if it has remaining points
      if (action.payload.remainingPoints > 0) {
        state.activePackage = action.payload;
      }
    },
    purchasePackageError: (state) => {
      state.purchasingPackageId = null;
      state.loading = false;
      state.error = "שגיאה בעת רכישת חבילה";
    },
    // Local decrement for immediate UI feedback
    decrementPackageBooks: (state) => {
      if (state.activePackage && state.activePackage.remainingPoints > 0) {
        state.activePackage.remainingPoints -= 1;
        // If active package is depleted, find the next available package
        if (state.activePackage.remainingPoints === 0) {
          const nextActivePackage = state.userPackages.find(
            (pkg) =>
              pkg.isActive &&
              pkg.remainingPoints > 0 &&
              pkg.id !== state.activePackage?.id
          );
          state.activePackage = nextActivePackage || null;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch packages cases
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.availablePackages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת שליפת חבילות";
      })
      // Fetch package by ID cases
      .addCase(fetchPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedPackage = null;
      })
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPackage = action.payload;
      })
      .addCase(fetchPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת שליפת חבילה";
        state.selectedPackage = null;
      })
      // Fetch user packages cases
      .addCase(fetchUserPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.userPackages = action.payload;
        // Find the first active package with remaining points
        state.activePackage =
          action.payload.find(
            (pkg) => pkg.isActive && pkg.remainingPoints > 0
          ) || null;
      })
      .addCase(fetchUserPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת שליפת חבילות משתמש";
      })
      // Purchase package cases
      .addCase(purchasePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchasePackage.fulfilled, (state, action) => {
        state.loading = false;
        state.userPackages.push(action.payload);
        // Set as active package if it has remaining points
        if (action.payload.remainingPoints > 0) {
          state.activePackage = action.payload;
        }
      })
      .addCase(purchasePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת רכישת חבילה";
      })
      // Update package points cases
      .addCase(updatePackagePoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackagePoints.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPackage = action.payload;
        const index = state.userPackages.findIndex(
          (pkg) => pkg.id === updatedPackage.id
        );
        if (index !== -1) {
          state.userPackages[index] = updatedPackage;
        }
        if (state.activePackage?.id === updatedPackage.id) {
          state.activePackage = updatedPackage;
        }
      })
      .addCase(updatePackagePoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת עדכון נקודות חבילה";
      })
      // Decrement package points cases
      .addCase(decrementPackagePoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decrementPackagePoints.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPackage = action.payload;
        const index = state.userPackages.findIndex(
          (pkg) => pkg.id === updatedPackage.id
        );
        if (index !== -1) {
          state.userPackages[index] = updatedPackage;
        }
        if (state.activePackage?.id === updatedPackage.id) {
          state.activePackage = updatedPackage;
          // If this package is depleted, find the next available package
          if (updatedPackage.remainingPoints === 0) {
            const nextActivePackage = state.userPackages.find(
              (pkg) =>
                pkg.isActive &&
                pkg.remainingPoints > 0 &&
                pkg.id !== updatedPackage.id
            );
            state.activePackage = nextActivePackage || null;
          }
        }
      })
      .addCase(decrementPackagePoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת עדכון נקודות חבילה";
      });
  },
});

export const { clearSelectedPackage, clearError } = packagesSlice.actions;

// Add missing functions that are used in components
export const purchasePackageStart = (packageId: string) => ({
  type: "packages/purchasePackageStart",
  payload: packageId,
});

export const purchasePackageSuccess = (userPackage: PackageUser) => ({
  type: "packages/purchasePackageSuccess",
  payload: userPackage,
});

export const purchasePackageError = () => ({
  type: "packages/purchasePackageError",
});

export const decrementPackageBooks = () => ({
  type: "packages/decrementPackageBooks",
});

export default packagesSlice.reducer;
