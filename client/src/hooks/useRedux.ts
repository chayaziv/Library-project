import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchUserPackages } from "../store/slices/packagesSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook to refresh user packages
export const useRefreshUserPackages = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const refreshUserPackages = () => {
    if (user) {
      dispatch(fetchUserPackages(user.id));
    }
  };

  return refreshUserPackages;
};
