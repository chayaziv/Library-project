import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/hooks/useRedux";
import { BookOpen, Package, Users, Zap } from "lucide-react";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { activePackage } = useAppSelector((state) => state.packages);
  const navigate = useNavigate();

  // Remove auto-redirect to allow viewing home page anytime

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 flex items-center justify-center gap-3">
            <BookOpen className="h-12 w-12" />
            Book Library
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Borrow books easily with personalized packages
          </p>
          {!isAuthenticated ? (
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          ) : (
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/books")}>
                Browse Books
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/packages")}
              >
                View Packages
              </Button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Borrow Packages</h3>
            <p className="text-muted-foreground">
              Choose from borrow packages tailored to your taste
            </p>
          </div>

          <div className="text-center p-6">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Variety of Books</h3>
            <p className="text-muted-foreground">
              Thousands of books in different categories: thriller, romance,
              comics and more
            </p>
          </div>

          <div className="text-center p-6">
            <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Quick Borrowing</h3>
            <p className="text-muted-foreground">
              Simple and fast borrowing process with advanced date management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
