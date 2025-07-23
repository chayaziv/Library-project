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
import { updateBookUser } from "@/store/slices/bookUsersSlice";
import { toast } from "@/hooks/use-toast";
import { BookOpen, Calendar, ArrowRight, Save } from "lucide-react";
import { format } from "date-fns";

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

export const UpdateBorrow = () => {
  const { borrowId } = useParams<{ borrowId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { activeBookUsers } = useAppSelector((state) => state.bookUsers);
  const [selectedBorrow, setSelectedBorrow] = useState<any>(null);

  const form = useForm<BorrowFormData>({
    resolver: zodResolver(borrowSchema),
  });

  useEffect(() => {
    const borrow = activeBookUsers.find((b) => b.id === Number(borrowId));
    if (!borrow) {
      navigate("/active-borrows");
      return;
    }

    // Check if borrow can be modified
    if (!borrow.canModify || new Date(borrow.borrowDate) <= new Date()) {
      toast({
        title: "Cannot modify borrow",
        description: "This borrow cannot be modified as it has already started",
        variant: "destructive",
      });
      navigate("/active-borrows");
      return;
    }

    setSelectedBorrow(borrow);
    form.setValue("borrowDate", borrow.borrowDate);
    form.setValue("returnDate", borrow.returnDate);
  }, [borrowId, activeBookUsers, navigate, form]);

  const onSubmit = async (data: BorrowFormData) => {
    if (!selectedBorrow) return;

    try {
      await dispatch(
        updateBookUser({
          bookUserId: selectedBorrow.id,
          returnDate: data.returnDate,
        })
      ).unwrap();

      toast({
        title: "Borrow updated successfully!",
        description: `Updated dates for "${selectedBorrow.book.name}"`,
      });

      navigate("/active-borrows");
    } catch (error) {
      toast({
        title: "Error updating borrow",
        description: "An error occurred while updating the borrow",
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

  if (!selectedBorrow) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="h-8 w-8" />
          Update Borrow
        </h1>
        <p className="text-muted-foreground">
          Update the borrow dates for the selected book
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
                  alt={selectedBorrow.book.name}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">
                    {selectedBorrow.book.name}
                  </h3>
                  <Badge
                    className={getCategoryColor(
                      selectedBorrow.book.category?.name || ""
                    )}
                  >
                    {selectedBorrow.book.category?.name}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  By: {selectedBorrow.book.author}
                </p>
                <p className="text-sm">{selectedBorrow.book.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Form */}
        <Card>
          <CardHeader>
            <CardTitle>Update Borrow Dates</CardTitle>
            <CardDescription>
              Select new borrow and return dates
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
                            format(new Date(), "yyyy-MM-dd")
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Update Borrow
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/active-borrows")}
                  >
                    Cancel
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
