
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  GraduationCap, 
  LogOut, 
  User, 
  BookOpen, 
  Calendar, 
  ClipboardCheck, 
  BarChart, 
  Users, 
  FileText,
  Settings
} from 'lucide-react';

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

type SidebarProps = {
  role: 'admin' | 'teacher' | 'student';
};

const adminNavItems: NavItem[] = [
  { icon: BarChart, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Users, label: 'User Management', href: '/admin/users' },
  { icon: BookOpen, label: 'Syllabus Management', href: '/admin/syllabus' },
  { icon: FileText, label: 'Content Management', href: '/admin/content' },
  { icon: ClipboardCheck, label: 'Attendance', href: '/admin/attendance' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const teacherNavItems: NavItem[] = [
  { icon: BarChart, label: 'Dashboard', href: '/teacher/dashboard' },
  { icon: BookOpen, label: 'Upload Notes', href: '/teacher/notes' },
  { icon: FileText, label: 'Upload Marks', href: '/teacher/marks' },
  { icon: Calendar, label: 'Timetable', href: '/teacher/timetable' },
  { icon: ClipboardCheck, label: 'Attendance', href: '/teacher/attendance' },
  { icon: Settings, label: 'Settings', href: '/teacher/settings' },
];

const studentNavItems: NavItem[] = [
  { icon: BarChart, label: 'Dashboard', href: '/student/dashboard' },
  { icon: BookOpen, label: 'Learning Materials', href: '/student/materials' },
  { icon: FileText, label: 'Exam Results', href: '/student/results' },
  { icon: Calendar, label: 'Timetable', href: '/student/timetable' },
  { icon: ClipboardCheck, label: 'Attendance', href: '/student/attendance' },
  { icon: Settings, label: 'Settings', href: '/student/settings' },
];

const getNavItems = (role: string): NavItem[] => {
  switch (role) {
    case 'admin':
      return adminNavItems;
    case 'teacher':
      return teacherNavItems;
    case 'student':
      return studentNavItems;
    default:
      return studentNavItems;
  }
};

const DashboardSidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const navItems = getNavItems(role);
  
  const roleTitles = {
    admin: 'Administrator',
    teacher: 'Teacher',
    student: 'Student'
  };

  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">OccxLear</span>
        </Link>
        <div className="text-sm text-muted-foreground mt-1">{roleTitles[role]} Portal</div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-4">
        <Separator className="mb-4" />
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Test User</p>
            <p className="text-xs text-muted-foreground">{role}@school.com</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 mt-2"
          onClick={() => {
            localStorage.removeItem('userRole');
            window.location.href = '/login';
          }}
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
