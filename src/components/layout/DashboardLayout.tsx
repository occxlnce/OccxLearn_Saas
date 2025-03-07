
import React from 'react';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'teacher' | 'student';
  pageTitle: string;
}

const DashboardLayout = ({ children, role, pageTitle }: DashboardLayoutProps) => {
  // Check if user is authenticated with the correct role
  const userRole = localStorage.getItem('userRole');
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect if trying to access wrong role's dashboard
  if (userRole !== role) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role={role} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader pageTitle={pageTitle} />
          <main className="flex-1 p-4 md:p-6 bg-secondary/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
