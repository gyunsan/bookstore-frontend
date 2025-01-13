import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./hooks/useCart";
import { Navbar } from "./components/Navbar";
import { Cart } from "./components/Cart";
import Books from "./pages/Books";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-secondary/30">
            <Navbar />
            <Cart />
            <main className="pt-6">
              <Routes>
                <Route path="/" element={<Books />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;