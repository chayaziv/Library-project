import { useAppSelector, useAppDispatch } from "./useRedux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  User,
} from "../store/slices/authSlice";
import { toast } from "@/hooks/use-toast";
import { apiService, UserDto } from "@/services/api";

interface LoginData {
  name: string;
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
      dispatch(loginStart());

      const response = await apiService.login(data);

      if (response.success && response.data) {
        const user: User = {
          id: response.data.id || 0,
          name: response.data.name,
          password: response.data.password,
          email: response.data.email,
          phone: response.data.phone,
        };

        dispatch(loginSuccess(user));
        toast({
          title: "התחברות בוצעה בהצלחה",
          description: `שלום ${user.name}!`,
        });
        return { success: true, user };
      } else {
        dispatch(loginFailure());
        toast({
          title: "שגיאה בהתחברות",
          description: response.error || "תעודת זהות או סיסמה שגויים",
          variant: "destructive",
        });
        return {
          success: false,
          error: response.error || "Invalid credentials",
        };
      }
    } catch (error) {
      dispatch(loginFailure());
      toast({
        title: "שגיאה בהתחברות",
        description: "אירעה שגיאה בעת ההתחברות",
        variant: "destructive",
      });
      return { success: false, error: "Login failed" };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      dispatch(loginStart());

      const userData: UserDto = {
        name: data.name,
        password: data.password,
        email: data.email,
        phone: data.phone,
      };

      const response = await apiService.register(userData);

      if (response.success && response.data) {
        const user: User = {
          id: response.data.id || 0,
          name: response.data.name,
          password: response.data.password,
          email: response.data.email,
          phone: response.data.phone,
        };

        dispatch(loginSuccess(user));
        toast({
          title: "הרשמה בוצעה בהצלחה",
          description: `ברוך הבא ${user.name}!`,
        });
        return { success: true, user };
      } else {
        dispatch(loginFailure());
        toast({
          title: "שגיאה בהרשמה",
          description: response.error || "משתמש עם שם זה כבר קיים במערכת",
          variant: "destructive",
        });
        return {
          success: false,
          error: response.error || "User already exists",
        };
      }
    } catch (error) {
      dispatch(loginFailure());
      toast({
        title: "שגיאה בהרשמה",
        description: "אירעה שגיאה בעת ההרשמה",
        variant: "destructive",
      });
      return { success: false, error: "Registration failed" };
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
