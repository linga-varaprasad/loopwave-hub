
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import VideoDetail from "./pages/VideoDetail";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

// For demo purposes, using a simple check if user is logged in
// In a real app, this would be handled with a proper auth system
const isLoggedIn = () => {
  // This is a placeholder - in a real app you'd check if the user is authenticated
  return localStorage.getItem("isLoggedIn") === "true";
};

// For demo purposes, this will be used to "authenticate" the user
const setLoggedIn = (value: boolean) => {
  localStorage.setItem("isLoggedIn", value.toString());
};

// Authenticate user for demo purposes
// This would be called after successful login
window.authenticateUser = () => {
  setLoggedIn(true);
  window.location.href = "/";
};

// Logout user for demo purposes
window.logoutUser = () => {
  setLoggedIn(false);
  window.location.href = "/onboarding";
};

// Protected route component with consistent layout
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/onboarding" replace />;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            
            {/* Protected routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/video/:id" 
              element={
                <ProtectedRoute>
                  <VideoDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/upload" 
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/explore" 
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
