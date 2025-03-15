
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SearchBar from '@/components/dashboard/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentsList from '@/components/dashboard/admin/students/StudentsList';
import TeachersList from '@/components/dashboard/admin/teachers/TeachersList';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('students');
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <SearchBar 
            onSearch={handleSearch} 
            placeholder={`Search ${activeTab}...`} 
          />
        </div>
        
        <Tabs defaultValue="students" onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mb-6">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="flex-1">
            <StudentsList searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="teachers" className="flex-1">
            <TeachersList searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
