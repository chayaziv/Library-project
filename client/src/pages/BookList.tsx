import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import {
  filterByCategory,
  fetchBooks,
  fetchCategories,
} from "@/store/slices/booksSlice";
import { fetchUserPackages } from "@/store/slices/packagesSlice";
import { BookOpen, Filter, Package } from "lucide-react";

export const BookList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { filteredBooks, selectedCategory, loading, categories } =
    useAppSelector((state) => state.books);
  const {
    activePackage,
    userPackages,
    loading: packagesLoading,
  } = useAppSelector((state) => state.packages);
  const { user } = useAppSelector((state) => state.auth);

  // Use English category names to match the booksSlice
  // Remove the hardcoded categories array

  useEffect(() => {
    // Load books and categories
    dispatch(fetchBooks());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Load user packages if user is authenticated
    if (user) {
      dispatch(fetchUserPackages(user.id));
    }
  }, [dispatch, user]);

  const handleCategoryChange = (category: string) => {
    dispatch(filterByCategory(category));
  };

  const handleBorrowBook = (bookId: number) => {
    // Check if user has any active package with remaining points
    const hasActivePackage = userPackages.some(
      (pkg) => pkg.isActive && pkg.remainingPoints > 0
    );

    if (!hasActivePackage) {
      navigate("/packages");
      return;
    }
    navigate(`/borrow/new/${bookId}`);
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

  // Calculate total remaining books across all active packages
  const totalRemainingBooks = userPackages
    .filter((pkg) => pkg.isActive)
    .reduce((total, pkg) => total + pkg.remainingPoints, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              Book List
            </h1>
            <p className="text-muted-foreground">
              Choose a book to borrow from our collection
            </p>
          </div>

          <div className="text-left">
            <div className="text-sm text-muted-foreground">
              Total books available
            </div>
            <div className="font-semibold text-lg">{totalRemainingBooks}</div>
            <div className="text-xs text-muted-foreground">
              across{" "}
              {
                userPackages.filter(
                  (pkg) => pkg.isActive && pkg.remainingPoints > 0
                ).length
              }{" "}
              active packages
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5" />
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="All" value="All">
                All
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading || packagesLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading books...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground">
            Try changing the category filter or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleBorrowBook(book.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg line-clamp-2">
                    {book.name}
                  </CardTitle>
                  <Badge
                    className={getCategoryColor(book.category?.name || "")}
                  >
                    {book.category?.name}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  By: {book.author}
                </p>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {book.name}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {book.isActive ? "Available" : "Not Available"}
                  </div>
                  <Button
                    size="sm"
                    disabled={!book.isActive || totalRemainingBooks <= 0}
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    Borrow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
