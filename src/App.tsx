
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
import SubjectsManagementPage from "./pages/dashboard/admin/SubjectsManagement";
import ContentManagementPage from "./pages/dashboard/admin/ContentManagement";
import AttendanceManagementPage from "./pages/dashboard/admin/AttendanceManagement";
import SettingsPage from "./pages/dashboard/admin/Settings";

// Teacher Dashboard Pages
import TeacherDashboard from "./pages/dashboard/teacher/Dashboard";
import UploadNotes from "./pages/dashboard/teacher/UploadNotes";
import UploadMarks from "./pages/dashboard/teacher/UploadMarks";
import TeacherTimetable from "./pages/dashboard/teacher/Timetable";
import TeacherAttendance from "./pages/dashboard/teacher/Attendance";
import TeacherMessaging from "./pages/dashboard/teacher/Messaging";
import TeacherSettings from "./pages/dashboard/teacher/Settings";

// Student Dashboard Pages
import StudentDashboard from "./pages/dashboard/student/Dashboard";
import LearningMaterials from "./pages/dashboard/student/LearningMaterials";
import ExamResults from "./pages/dashboard/student/ExamResults";
import Timetable from "./pages/dashboard/student/Timetable";
import Attendance from "./pages/dashboard/student/Attendance";
import Assignments from "./pages/dashboard/student/Assignments";
import StudentSettings from "./pages/dashboard/student/Settings";

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
          <Route path="/admin/subjects" element={<SubjectsManagementPage />} />
          <Route path="/admin/content" element={<ContentManagementPage />} />
          <Route path="/admin/attendance" element={<AttendanceManagementPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/upload-notes" element={<UploadNotes />} />
          <Route path="/teacher/upload-marks" element={<UploadMarks />} />
          <Route path="/teacher/timetable" element={<TeacherTimetable />} />
          <Route path="/teacher/attendance" element={<TeacherAttendance />} />
          <Route path="/teacher/messaging" element={<TeacherMessaging />} />
          <Route path="/teacher/settings" element={<TeacherSettings />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/materials" element={<LearningMaterials />} />
          <Route path="/student/results" element={<ExamResults />} />
          <Route path="/student/timetable" element={<Timetable />} />
          <Route path="/student/attendance" element={<Attendance />} />
          <Route path="/student/assignments" element={<Assignments />} />
          <Route path="/student/settings" element={<StudentSettings />} />
          
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
