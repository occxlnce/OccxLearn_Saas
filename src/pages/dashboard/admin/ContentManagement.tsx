import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SearchBar from '@/components/dashboard/SearchBar';

const ContentManagement = () => {
  return (
    <DashboardLayout role="admin" pageTitle="Content Management">
      <div>
        <h1>Content Management</h1>
        <SearchBar onSearch={() => {}} placeholder="Search content..." />
      </div>
    </DashboardLayout>
  );
};

export default ContentManagement;
