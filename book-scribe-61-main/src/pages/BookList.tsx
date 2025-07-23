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
import { BookOpen, Filter } from "lucide-react";

export const BookList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { filteredBooks, selectedCategory, loading } = useAppSelector(
    (state) => state.books
  );
  const { activePackage, loading: packagesLoading } = useAppSelector((state) => state.packages);
  const { user } = useAppSelector((state) => state.auth);

  // Use English category names to match the booksSlice
  const categories = ["All", "Thriller", "Comics", "Romance"];

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

  useEffect(() => {
    // Check if there is an active package with points
    if (!activePackage || activePackage.remainingPoints <= 0) {
      navigate("/packages");
      return;
    }
  }, [activePackage, navigate]);

  const handleCategoryChange = (category: string) => {
    dispatch(filterByCategory(category));
  };

  const handleBorrowBook = (bookId: number) => {
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

  if (!activePackage) {
    return null; // useEffect will navigate
  }

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
              Points remaining
            </div>
            <div className="font-semibold text-lg">
              {activePackage.remainingPoints}
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
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No books available</h3>
          <p className="text-muted-foreground">
            {selectedCategory === "All"
              ? "No books available for borrowing at the moment"
              : `No books available in the category "${selectedCategory}"`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks
            .filter((book) => book.isActive)
            .map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-[3/4] bg-muted rounded-md mb-4 flex items-center justify-center">
                    {/* No image field in new model, so just show placeholder */}
                    <img
                      src={"/placeholder.svg"}
                      alt={book.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg leading-tight">
                      {book.name}
                    </CardTitle>
                    <Badge
                      className={getCategoryColor(book.category?.name || "")}
                    >
                      {book.category?.name}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {book.author}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* No description field in new model */}
                  <Button
                    onClick={() => handleBorrowBook(book.id)}
                    className="w-full"
                    // disabled={
                    //   !book.isActive || activePackage.remainingPoints <= 0
                    // }
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Borrow Book!
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {activePackage.remainingPoints <= 0 && (
        <div className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg">
          <p className="font-semibold">No balance in package</p>
          <p className="text-sm">Purchase a new package</p>
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
