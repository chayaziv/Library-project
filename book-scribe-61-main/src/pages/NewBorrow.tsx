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
import { decrementPackageBooks } from "@/store/slices/packagesSlice";
import { updateBookAvailability } from "@/store/slices/booksSlice";
import { toast } from "@/hooks/use-toast";
import { BookOpen, Calendar, ArrowRight, AlertCircle } from "lucide-react";
import { format, addDays } from "date-fns";

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

    // Check if user has a relevant package for this book category
    const hasRelevantPackage = userPackages.some(
      (pkg) =>
        pkg.isActive &&
        pkg.remainingPoints > 0 &&
        pkg.package.category === book.category
    );

    if (!hasRelevantPackage) {
      toast({
        title: "No matching package",
        description: `You don't have an active package for ${book.category} books. Please purchase a relevant package.`,
        variant: "destructive",
      });
      navigate("/packages");
      return;
    }

    // Check if there's an active package with remaining books
    if (!activePackage || activePackage.remainingPoints <= 0) {
      navigate("/packages");
      return;
    }

    setSelectedBook(book);
  }, [bookId, books, activePackage, userPackages, navigate, toast]);

  const onSubmit = async (data: BorrowFormData) => {
    if (!selectedBook || !user || !activePackage) return;

    // Check balance
    if (activePackage.remainingPoints <= 0) {
      toast({
        title: "No balance in package",
        description: "Cannot borrow more books. Please purchase a new package.",
        variant: "destructive",
      });
      navigate("/packages");
      return;
    }

    try {
      // Create new borrow using the async thunk
      await dispatch(
        createBookUser({
          userId: user.id,
          bookId: selectedBook.id,
          returnDate: data.returnDate,
        })
      ).unwrap();

      // Update local state
      dispatch(decrementPackageBooks());
      dispatch(
        updateBookAvailability({
          bookId: selectedBook.id,
          isActive: false,
        })
      );

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Thriller":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Comics":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Romance":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  if (!selectedBook || !activePackage) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="h-8 w-8" />
          New Borrow
        </h1>
        <p className="text-muted-foreground">
          Set borrow details for the selected book
        </p>
      </div>

      <div className="space-y-6">
        {/* Book Details */}
        <Card>
          <CardHeader>
            <CardTitle>Book Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="w-24 h-32 bg-muted rounded-md flex-shrink-0">
                <img
                  src={"/placeholder.svg"}
                  alt={selectedBook.name}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{selectedBook.name}</h3>
                  <Badge
                    className={getCategoryColor(
                      selectedBook.category?.name || ""
                    )}
                  >
                    {selectedBook.category?.name}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  By: {selectedBook.author}
                </p>
                <p className="text-sm">{selectedBook.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Balance */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Package Balance</h3>
                <p className="text-sm text-muted-foreground">
                  {activePackage.package.name}
                </p>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">
                  {activePackage.remainingPoints}
                </div>
                <div className="text-sm text-muted-foreground">
                  books remaining
                </div>
              </div>
            </div>

            {activePackage.remainingPoints <= 1 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  {activePackage.remainingPoints === 1
                    ? "This is the last book in your package"
                    : "No balance in package. Purchase a new package"}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date Form */}
        <Card>
          <CardHeader>
            <CardTitle>Borrow Dates</CardTitle>
            <CardDescription>
              Select the borrow and return dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
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
                          min={
                            form.watch("borrowDate") ||
                            format(addDays(new Date(), 1), "yyyy-MM-dd")
                          }
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
                    disabled={activePackage.remainingPoints <= 0}
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
  );
};
