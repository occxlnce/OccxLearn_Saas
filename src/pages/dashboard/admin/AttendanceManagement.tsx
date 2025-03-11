
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AttendanceList from '@/components/dashboard/admin/attendance/AttendanceList';
import AttendanceStats from '@/components/dashboard/admin/attendance/AttendanceStats';

const AttendanceManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('attendance');
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log(`Searching for attendance: ${term}`);
  };

  return (
    <DashboardLayout role="admin" pageTitle="Attendance Management">
      <div className="w-full md:w-1/2 mb-6">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search by student, teacher, class, or date..." 
        />
      </div>
      
      <Tabs 
        defaultValue="attendance" 
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
          <TabsTrigger value="statistics">Statistics & Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="attendance">
          <AttendanceList searchTerm={searchTerm} />
        </TabsContent>
        <TabsContent value="statistics">
          <AttendanceStats />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AttendanceManagementPage;
