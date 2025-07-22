import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import Index from "./pages/Index";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PackageList } from "./pages/PackageList";
import { ActiveBorrows } from "./pages/ActiveBorrows";
import { BookList } from "./pages/BookList";
import { NewBorrow } from "./pages/NewBorrow";
import { UpdateBorrow } from "./pages/UpdateBorrow";
import { MyPurchases } from "./pages/MyPurchases";
import { BorrowHistory } from "./pages/BorrowHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/packages" element={<ProtectedRoute><PackageList /></ProtectedRoute>} />
            <Route path="/active-borrows" element={<ProtectedRoute><ActiveBorrows /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute><BookList /></ProtectedRoute>} />
            <Route path="/borrow/new/:bookId" element={<ProtectedRoute><NewBorrow /></ProtectedRoute>} />
            <Route path="/borrow/edit/:borrowId" element={<ProtectedRoute><UpdateBorrow /></ProtectedRoute>} />
            <Route path="/my-purchases" element={<ProtectedRoute><MyPurchases /></ProtectedRoute>} />
            <Route path="/borrow-history" element={<ProtectedRoute><BorrowHistory /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
