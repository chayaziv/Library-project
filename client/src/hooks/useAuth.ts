import { useAppSelector, useAppDispatch } from "./useRedux";
import { loginUser, registerUser, logout } from "../store/slices/authSlice";
import { User } from "../types";
import { toast } from "@/hooks/use-toast";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  password: string;
  email?: string;
  phone?: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );

  const login = async (data: LoginData) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();

      toast({
        title: "התחברות בוצעה בהצלחה",
        description: `שלום ${result.name}!`,
      });
      return { success: true, user: result };
    } catch (error: any) {
      toast({
        title: "שגיאה בהתחברות",
        description: error.message || "תעודת זהות או סיסמה שגויים",
        variant: "destructive",
      });
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const result = await dispatch(
        registerUser({
          name: data.name,
          email: data.email || "",
          password: data.password,
          phone: data.phone,
        })
      ).unwrap();

      toast({
        title: "הרשמה בוצעה בהצלחה",
        description: `ברוך הבא ${result.name}!`,
      });
      return { success: true, user: result };
    } catch (error: any) {
      toast({
        title: "שגיאה בהרשמה",
        description: error.message || "משתמש עם שם זה כבר קיים במערכת",
        variant: "destructive",
      });
      return { success: false, error: error.message || "Registration failed" };
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "התנתקת בהצלחה",
      description: "להתראות!",
    });
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout: handleLogout,
  };
};
