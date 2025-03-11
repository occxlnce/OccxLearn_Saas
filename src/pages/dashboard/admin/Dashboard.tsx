
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UserStatisticsWidget from '@/components/dashboard/admin/UserStatisticsWidget';
import SystemStatusWidget from '@/components/dashboard/admin/SystemStatusWidget';
import RecentActivitiesWidget from '@/components/dashboard/admin/RecentActivitiesWidget';
import UsageSummaryWidget from '@/components/dashboard/admin/UsageSummaryWidget';
import { SearchBar } from '@/components/dashboard/SearchBar';

const AdminDashboard = () => {
  const handleSearch = (term: string) => {
    console.log('Searching for:', term);
    // Implement search functionality here
  };

  return (
    <DashboardLayout role="admin" pageTitle="Admin Dashboard">
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Search users, subjects, or documents..." />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <UserStatisticsWidget />
        <SystemStatusWidget />
        <UsageSummaryWidget />
        <RecentActivitiesWidget />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
