import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import {
  cancelBookUser,
  completeBookUser,
  fetchActiveBookUsers,
} from "@/store/slices/bookUsersSlice";
import { fetchUserPackages } from "@/store/slices/packagesSlice";
import { toast } from "@/hooks/use-toast";
import {
  BookOpen,
  Calendar,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { getCategoryColor } from "@/lib/utils";

export const ActiveBorrows = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeBookUsers, loading } = useAppSelector(
    (state) => state.bookUsers
  );
  const {
    activePackage,
    userPackages,
    loading: packagesLoading,
  } = useAppSelector((state) => state.packages);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Load user packages if user is authenticated
    if (user) {
      dispatch(fetchUserPackages(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Load active borrows if user is authenticated
    if (user) {
      dispatch(fetchActiveBookUsers(user.id));
    }
  }, [dispatch, user]);

  const handleCancelBorrow = (borrowId: number) => {
    dispatch(cancelBookUser(borrowId));
    toast({
      title: "Borrow cancelled",
      description: "The borrow was cancelled successfully",
    });
  };

  const handleCompleteBorrow = (borrowId: number) => {
    dispatch(completeBookUser(borrowId));
    toast({
      title: "Borrow completed",
      description: "The book was returned successfully",
    });
  };

  const canModifyBorrow = (borrowDate: string) => {
    const borrowDateTime = new Date(borrowDate);
    const now = new Date();
    return borrowDateTime > now;
  };

  const getBorrowStatus = (borrow: any) => {
    const now = new Date();
    const borrowDate = new Date(borrow.borrowDate);
    const returnDate = new Date(borrow.returnDate);

    if (borrowDate > now) {
      return {
        status: "upcoming",
        label: "Upcoming",
        color: "bg-blue-100 text-blue-800",
      };
    } else if (returnDate < now) {
      return {
        status: "overdue",
        label: "Overdue",
        color: "bg-red-100 text-red-800",
      };
    } else {
      return {
        status: "active",
        label: "Active",
        color: "bg-green-100 text-green-800",
      };
    }
  };

  // Calculate total remaining books across all active packages
  const totalRemainingBooks = userPackages
    .filter((pkg) => pkg.isActive)
    .reduce((total, pkg) => total + pkg.remainingPoints, 0);

  const activePackagesCount = userPackages.filter(
    (pkg) => pkg.isActive && pkg.remainingPoints > 0
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              Active Borrows
            </h1>
            <p className="text-muted-foreground">Manage your active borrows</p>
          </div>

          <div className="text-left">
            <div className="text-sm text-muted-foreground">Available Books</div>
            <div className="font-semibold text-lg">
              {totalRemainingBooks} books
            </div>
            <div className="text-sm text-muted-foreground">
              across {activePackagesCount} active packages
            </div>
          </div>
        </div>

        <Button
          onClick={() => navigate("/books")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Borrow
        </Button>
      </div>

      {activeBookUsers.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No active borrows</h3>
          <p className="text-muted-foreground mb-4">
            You haven't borrowed any books yet. Start with a new borrow!
          </p>
          <Button onClick={() => navigate("/books")}>
            <Plus className="mr-2 h-4 w-4" />
            New Borrow
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeBookUsers.map((borrow) => {
            const borrowStatus = getBorrowStatus(borrow);
            const canModify = canModifyBorrow(borrow.borrowDate);

            return (
              <Card
                key={borrow.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {borrow.book.name}
                      <Badge
                        className={getCategoryColor(
                          borrow.book.category?.name || ""
                        )}
                      >
                        {borrow.book.category?.name}
                      </Badge>
                    </CardTitle>
                    <Badge className={borrowStatus.color}>
                      {borrowStatus.label}
                    </Badge>
                  </div>
                  <CardDescription>By: {borrow.book.author}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Borrow date:</span>
                      <span className="font-medium">
                        {format(new Date(borrow.borrowDate), "dd/MM/yyyy")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Return date:</span>
                      <span className="font-medium">
                        {format(new Date(borrow.returnDate), "dd/MM/yyyy")}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {canModify && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/borrow/edit/${borrow.id}`)}
                        className="flex-1"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    )}

                    {canModify && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelBorrow(borrow.id)}
                        className="flex-1"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    )}

                    {!canModify && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleCompleteBorrow(borrow.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Return
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {totalRemainingBooks <= 0 && (
        <div className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg">
          <p className="font-semibold">No active package or no balance</p>
          <p className="text-sm">Purchase a package to borrow books</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={() => navigate("/packages")}
          >
            Buy Package
          </Button>
        </div>
      )}
    </div>
  );
};
