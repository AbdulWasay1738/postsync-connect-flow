
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
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
  // Layout wrapper for public pages
  const PublicLayout = ({ children }: { children: React.ReactNode }) => (
    <>
      {children}
      <Footer />
    </>
  );

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <Sidebar>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* Protected routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/create" element={<CreatePost />} />
                    <Route path="/ai-captions" element={<AICaptions />} />
                    <Route path="/settings" element={<Settings />} />
                    
                    {/* 404 page */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Sidebar>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
