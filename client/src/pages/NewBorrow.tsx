import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { createBookUser } from "@/store/slices/bookUsersSlice";
import {
  decrementPackageBooks,
  fetchUserPackages,
  decrementPackagePoints,
} from "@/store/slices/packagesSlice";
import { updateBookAvailability } from "@/store/slices/booksSlice";
import { toast } from "@/hooks/use-toast";
import { BookOpen, Calendar, ArrowRight, AlertCircle } from "lucide-react";
import { format, addDays } from "date-fns";
import { getCategoryColor } from "@/lib/utils";

const borrowSchema = z
  .object({
    borrowDate: z.string().refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Borrow date must be today or in the future"),
    returnDate: z.string(),
  })
  .refine(
    (data) => {
      const borrowDate = new Date(data.borrowDate);
      const returnDate = new Date(data.returnDate);
      return returnDate > borrowDate;
    },
    {
      message: "Return date must be after borrow date",
      path: ["returnDate"],
    }
  );

type BorrowFormData = z.infer<typeof borrowSchema>;

export const NewBorrow = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { books } = useAppSelector((state) => state.books);
  const { activePackage, userPackages } = useAppSelector(
    (state) => state.packages
  );
  const { user } = useAppSelector((state) => state.auth);

  const [selectedBook, setSelectedBook] = useState<any>(null);

  const form = useForm<BorrowFormData>({
    resolver: zodResolver(borrowSchema),
    defaultValues: {
      borrowDate: format(new Date(), "yyyy-MM-dd"),
      returnDate: format(addDays(new Date(), 14), "yyyy-MM-dd"),
    },
  });

  useEffect(() => {
    // Find the selected book
    const book = books.find((b) => b.id === Number(bookId));
    if (!book) {
      navigate("/books");
      return;
    }

    // Check if book is active
    if (!book.isActive) {
      toast({
        title: "Book not available",
        description: "This book is not available for borrowing.",
        variant: "destructive",
      });
      navigate("/books");
      return;
    }

    setSelectedBook(book);
  }, [bookId, books, navigate, toast]);

  const onSubmit = async (data: BorrowFormData) => {
    if (!selectedBook || !user) return;

    // Check if user has a suitable package for this book
    if (!hasRelevantPackage) {
      toast({
        title: "No suitable package",
        description:
          "You don't have a suitable package for this book category. Please purchase a package.",
        variant: "destructive",
      });
      return;
    }

    // Check if there are remaining points in the relevant package
    if (totalCategoryPoints <= 0) {
      toast({
        title: "No balance in package",
        description: "Cannot borrow more books. Please purchase a new package.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create new borrow using the async thunk
      const packageUserId = relevantPackages[0]?.id;
      await dispatch(
        createBookUser({
          userId: user.id,
          bookId: selectedBook.id,
          borrowDate: data.borrowDate,
          returnDate: data.returnDate,
          packageUserId,
        })
      ).unwrap();

      // Update package points on the server
      await dispatch(decrementPackagePoints(relevantPackages[0].id)).unwrap();

      // Update local state for immediate UI feedback
      dispatch(decrementPackageBooks());
      dispatch(
        updateBookAvailability({
          bookId: selectedBook.id,
          isActive: false,
        })
      );

      // Refresh user packages to get updated remaining points
      await dispatch(fetchUserPackages(user.id)).unwrap();

      toast({
        title: "Borrow completed successfully!",
        description: `You borrowed "${selectedBook.name}" successfully`,
      });

      navigate("/active-borrows");
    } catch (error) {
      toast({
        title: "Error creating borrow",
        description: "An error occurred while creating the borrow",
        variant: "destructive",
      });
    }
  };

  if (!selectedBook) {
    return null;
  }

  // Calculate total remaining points for the selected book's category
  const categoryId = selectedBook?.category?.id || selectedBook?.categoryId;
  const relevantPackages = userPackages.filter(
    (pkg) => pkg.isActive && pkg.package?.categoryId === categoryId
  );
  const totalCategoryPoints = relevantPackages.reduce(
    (sum, pkg) => sum + pkg.remainingPoints,
    0
  );
  const hasRelevantPackage =
    relevantPackages.length > 0 && totalCategoryPoints > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            New Borrow
          </h1>
          <p className="text-muted-foreground">
            Create a new borrow for "{selectedBook.name}"
          </p>
        </div>

        <div className="grid gap-6">
          {/* Book Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Book Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedBook.name}</h3>
                  <p className="text-muted-foreground">
                    By: {selectedBook.author}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    className={getCategoryColor(selectedBook.category?.name)}
                  >
                    {selectedBook.category?.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Category
                  </span>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Description:</span>
                  <p className="mt-1">{selectedBook.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Information */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Package Balance</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedBook.category?.name}
                  </p>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">
                    {totalCategoryPoints}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    books remaining in this category
                  </div>
                </div>
              </div>
              {!hasRelevantPackage && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-800">
                    No suitable package for this category. Please purchase a
                    package to borrow this book.
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    className="ml-auto"
                    onClick={() => navigate("/packages")}
                  >
                    Go to Packages
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Date Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Borrow Dates
              </CardTitle>
              <CardDescription>
                Set the borrow and return dates for your book
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="borrowDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Borrow Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            min={format(new Date(), "yyyy-MM-dd")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="returnDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Return Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!hasRelevantPackage || totalCategoryPoints <= 0}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Create Borrow
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/books")}
                    >
                      Back to List
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
