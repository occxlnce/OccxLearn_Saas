import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";

// Admin Dashboard Pages
import AdminDashboard from "./pages/dashboard/admin/Dashboard";
import UserManagementPage from "./pages/dashboard/admin/UserManagement";
import SyllabusManagementPage from "./pages/dashboard/admin/SyllabusManagement";
import ContentManagementPage from "./pages/dashboard/admin/ContentManagement";
import AttendanceManagementPage from "./pages/dashboard/admin/AttendanceManagement";
import SettingsPage from "./pages/dashboard/admin/Settings";

// Other Dashboard Pages
import TeacherDashboard from "./pages/dashboard/teacher/Dashboard";
import StudentDashboard from "./pages/dashboard/student/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/syllabus" element={<SyllabusManagementPage />} />
          <Route path="/admin/content" element={<ContentManagementPage />} />
          <Route path="/admin/attendance" element={<AttendanceManagementPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
