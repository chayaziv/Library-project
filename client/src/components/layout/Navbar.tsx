import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/store/slices/authSlice";
import { fetchUserPackages } from "@/store/slices/packagesSlice";
import {
  BookOpen,
  Home,
  Package,
  LogOut,
  User,
  CreditCard,
} from "lucide-react";
import { useEffect } from "react";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { userPackages } = useAppSelector((state) => state.packages);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPackages(user.id));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Calculate total remaining books across all active packages
  const totalRemainingBooks = userPackages
    .filter((pkg) => pkg.isActive)
    .reduce((total, pkg) => total + pkg.remainingPoints, 0);

  if (!user) {
    return null;
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">Book Library</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <Link
                to="/active-borrows"
                className="flex items-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Active Borrows</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <Link to="/books" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Books</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <Link to="/packages" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Packages</span>
              </Link>
            </Button>

            {totalRemainingBooks > 0 && (
              <Badge
                variant="secondary"
                className="flex items-center space-x-2"
              >
                <BookOpen className="h-3 w-3" />
                <span>{totalRemainingBooks} books left</span>
              </Badge>
            )}

            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link
                  to="/my-purchases"
                  className="flex items-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>My Purchases</span>
                </Link>
              </Button>

              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{user.name}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
