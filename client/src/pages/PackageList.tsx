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
  
  purchasePackage,
  fetchPackages,
  fetchUserPackages,
} from "@/store/slices/packagesSlice";
import { toast } from "@/hooks/use-toast";
import { Package2, BookOpen, CreditCard, Loader2 } from "lucide-react";

export const PackageList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { availablePackages, loading, purchasingPackageId } = useAppSelector(
    (state) => state.packages
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Load available packages
    dispatch(fetchPackages());
  }, [dispatch]);

  const handlePurchase = async (packageId: number) => {
    if (!user) return;

    try {
      // Use the async thunk for actual API call
      await dispatch(purchasePackage({ userId: user.id, packageId })).unwrap();

      // Refresh user packages to get the latest data
      await dispatch(fetchUserPackages(user.id)).unwrap();

      // Find the purchased package details for the success message
      const purchasedPackage = availablePackages.find(
        (pkg) => pkg.id === packageId
      );

      toast({
        title: "Purchase completed successfully!",
        description: `You purchased "${purchasedPackage?.name}" package with ${purchasedPackage?.pointCount} books for ₪${purchasedPackage?.price}`,
      });

      // Navigate to purchase history after successful purchase
      navigate("/my-purchases");
    } catch (error: any) {
      console.error("Purchase error:", error);

      let errorMessage = "An error occurred while purchasing the package";
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Purchase error",
        description: errorMessage,
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Package2 className="h-8 w-8" />
          Borrow Packages
        </h1>
        <p className="text-muted-foreground">
          Choose the right borrow package for you and start borrowing books
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availablePackages.map((pkg) => (
          <Card
            key={pkg.id}
            className="relative hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <Badge className={getCategoryColor(pkg.category.name)}>
                  {pkg.category.name}
                </Badge>
              </div>
              <CardDescription>{pkg.name}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4" />
                <span>{pkg.pointCount} books for borrowing</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">
                  ₪{pkg.price}
                </div>
                <Button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={purchasingPackageId === pkg.id + ""}
                  className="flex items-center gap-2"
                >
                  {purchasingPackageId === pkg.id + "" && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  <CreditCard className="h-4 w-4" />
                  Purchase
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {availablePackages.length === 0 && (
        <div className="text-center py-12">
          <Package2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No packages available</h3>
          <p className="text-muted-foreground">
            Currently no packages are available for purchase
          </p>
        </div>
      )}
    </div>
  );
};
