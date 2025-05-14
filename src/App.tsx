
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import ResourceUpload from "./pages/ResourceUpload";
import Resume from "./pages/Resume";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Moderation from "./pages/Moderation";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Opportunities from "./pages/Opportunities";
import OpportunityDetail from "./pages/OpportunityDetail";
import OpportunityCreate from "./pages/OpportunityCreate";
import Wishlist from "./pages/Wishlist";
import Collaboration from "./pages/Collaboration";
import CollaborationDetail from "./pages/CollaborationDetail";
import UserDashboard from "./pages/UserDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CourseDetail />} />
                <Route path="/courses/:courseId/upload" element={<ResourceUpload />} />
                <Route path="/resources/upload" element={<ResourceUpload />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/moderate" element={<Moderation />} />
                <Route path="/about" element={<About />} />
                <Route path="/opportunities" element={<Opportunities />} />
                <Route path="/opportunities/:opportunityId" element={<OpportunityDetail />} />
                <Route path="/opportunities/new" element={<OpportunityCreate />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/collaboration" element={<Collaboration />} />
                <Route path="/collaboration/:id" element={<CollaborationDetail />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
