import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { fetchUserPackages } from "@/store/slices/packagesSlice";
import { useNavigate } from "react-router-dom";
import { CreditCard, Package, Plus } from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";

export const MyPurchases = () => {
  const dispatch = useAppDispatch();
  const { userPackages, loading } = useAppSelector((state) => state.packages);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user packages if user is authenticated
    if (user) {
      dispatch(fetchUserPackages(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <CreditCard className="h-8 w-8" />
              Purchase History
            </h1>
            <p className="text-muted-foreground">Packages you have purchased</p>
          </div>
          <Button onClick={() => navigate("/packages")}>
            <Plus className="mr-2 h-4 w-4" />
            Buy New Package
          </Button>
        </div>
      </div>

      {userPackages.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Purchases</h3>
          <p className="text-muted-foreground mb-4">
            You have not purchased any packages yet
          </p>
          <Button onClick={() => navigate("/packages")}>
            <Plus className="mr-2 h-4 w-4" />
            Buy a Package
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {userPackages.map((userPackage) => (
            <Card key={userPackage.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{userPackage.package.name}</CardTitle>
                    <p className="text-muted-foreground">
                      {userPackage.package.name}
                    </p>
                  </div>
                  <Badge
                    variant={userPackage.isActive ? "default" : "secondary"}
                  >
                    {userPackage.isActive ? "Active" : "Completed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      Purchase Date:
                    </span>
                    <div className="font-medium">
                      {format(
                        new Date(userPackage.purchaseDate),
                        "dd/MM/yyyy",
                        { locale: he }
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Books in Package:
                    </span>
                    <div className="font-medium">
                      {userPackage.package.pointCount}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Remaining:</span>
                    <div className="font-medium">
                      {userPackage.remainingPoints} books
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <div className="font-medium">
                      ₪{userPackage.package.price}
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
