import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/hooks/useRedux";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const { activePackage } = useAppSelector((state) => state.packages);
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      // אם יש חבילה פעילה עבור ל-ActiveBorrows, אחרת ל-PackageList
      if (activePackage && activePackage.remainingPoints > 0) {
        navigate("/active-borrows");
      } else {
        navigate("/packages");
      }
    }
  }, [isAuthenticated, activePackage, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    await login({
      name: data.name,
      password: data.password,
    });
  };

  const handleRegisterClick = () => {
    const currentData = form.getValues();
    navigate("/register", {
      state: {
        name: currentData.name,
        password: currentData.password,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your details to log in to the library system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Login
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleRegisterClick}
                >
                  Register
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>For testing: Use any name and password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
