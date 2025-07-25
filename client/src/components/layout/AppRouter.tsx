import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchUserPackages } from "@/store/slices/packagesSlice";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../../pages/Home";
import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register";
import { PackageList } from "../../pages/PackageList";
import { ActiveBorrows } from "../../pages/ActiveBorrows";
import { BookList } from "../../pages/BookList";
import { NewBorrow } from "../../pages/NewBorrow";
import { UpdateBorrow } from "../../pages/UpdateBorrow";
import { MyPurchases } from "../../pages/MyPurchases";
import { BorrowHistory } from "../../pages/BorrowHistory";
import NotFound from "../../pages/NotFound";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  // Refresh user packages when navigating to protected routes
  useEffect(() => {
    const protectedRoutes = [
      "/packages",
      "/active-borrows",
      "/books",
      "/borrow/new",
      "/borrow/edit",
      "/my-purchases",
      "/borrow-history",
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (isProtectedRoute && user) {
      dispatch(fetchUserPackages(user.id));
    }
  }, [location.pathname, user, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/packages"
        element={
          <ProtectedRoute>
            <PackageList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/active-borrows"
        element={
          <ProtectedRoute>
            <ActiveBorrows />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <BookList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/borrow/new/:bookId"
        element={
          <ProtectedRoute>
            <NewBorrow />
          </ProtectedRoute>
        }
      />
      <Route
        path="/borrow/edit/:borrowId"
        element={
          <ProtectedRoute>
            <UpdateBorrow />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-purchases"
        element={
          <ProtectedRoute>
            <MyPurchases />
          </ProtectedRoute>
        }
      />
      <Route
        path="/borrow-history"
        element={
          <ProtectedRoute>
            <BorrowHistory />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
