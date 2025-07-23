import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { fetchBookUserHistory } from "@/store/slices/bookUsersSlice";
import { History, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";

export const BorrowHistory = () => {
  const dispatch = useAppDispatch();
  const { bookUserHistory, loading } = useAppSelector(
    (state) => state.bookUsers
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Load borrow history if user is authenticated
    if (user) {
      dispatch(fetchBookUserHistory(user.id));
    }
  }, [dispatch, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <History className="h-8 w-8" />
          Borrow History
        </h1>
        <p className="text-muted-foreground">All the borrows you have made</p>
      </div>

      {bookUserHistory.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No History</h3>
          <p className="text-muted-foreground">
            You have not borrowed any books yet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookUserHistory.map((borrow) => (
            <Card key={borrow.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {borrow.book.name}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Author: {borrow.book.author}
                    </p>
                  </div>
                  <Badge className={getStatusColor(borrow.status)}>
                    {getStatusText(borrow.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Borrow Date:</span>
                    <div className="font-medium">
                      {format(new Date(borrow.borrowDate), "dd/MM/yyyy", {
                        locale: he,
                      })}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Planned Return Date:
                    </span>
                    <div className="font-medium">
                      {format(new Date(borrow.returnDate), "dd/MM/yyyy", {
                        locale: he,
                      })}
                    </div>
                  </div>
                  {borrow.actualReturnDate && (
                    <div>
                      <span className="text-muted-foreground">
                        Actual Return Date:
                      </span>
                      <div className="font-medium">
                        {format(
                          new Date(borrow.actualReturnDate),
                          "dd/MM/yyyy",
                          { locale: he }
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <div className="font-medium">
                      {borrow.book.category.name}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
