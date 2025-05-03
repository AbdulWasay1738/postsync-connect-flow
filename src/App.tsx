
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingPage from "./pages/Landing";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import CreatePost from "./pages/CreatePost";
import AICaptions from "./pages/AICaptions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // Layout wrapper to apply Navbar and Footer to protected routes
  const Layout = ({ children }: { children: React.ReactNode }) => (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Layout><LandingPage /></Layout>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
                <Route path="/calendar" element={<Layout><Calendar /></Layout>} />
                <Route path="/create" element={<Layout><CreatePost /></Layout>} />
                <Route path="/ai-captions" element={<Layout><AICaptions /></Layout>} />
                <Route path="/settings" element={<Layout><Settings /></Layout>} />
                
                {/* 404 page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
