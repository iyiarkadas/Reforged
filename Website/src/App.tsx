import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index.tsx";
import SystemPage from "./pages/SystemPage.tsx";
import CoachingPage from "./pages/CoachingPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ApplyPage from "./pages/ApplyPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import PortalPage from "./pages/PortalPage.tsx";
import AdminPage from "./pages/AdminPage.tsx"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/system" element={<SystemPage />} />
            <Route path="/coaching" element={<CoachingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/portal/:section" element={<PortalPage />} />
            
            {/* Open route accessible to everyone inside the system setup */}
            <Route path="/admin/applications" element={<AdminPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;