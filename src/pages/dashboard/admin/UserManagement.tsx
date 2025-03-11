
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentsList from '@/components/dashboard/admin/students/StudentsList';
import TeachersList from '@/components/dashboard/admin/teachers/TeachersList';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const UserManagementPage = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log(`Searching for ${term} in ${activeTab}`);
    // In a real app, this would filter the users displayed in the lists
  };

  return (
    <DashboardLayout role="admin" pageTitle="User Management">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-1/2">
          <SearchBar onSearch={handleSearch} placeholder={`Search ${activeTab}...`} />
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New {activeTab === 'students' ? 'Student' : 'Teacher'}
        </Button>
      </div>
      
      <Tabs 
        defaultValue="students" 
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <StudentsList searchTerm={searchTerm} />
        </TabsContent>
        <TabsContent value="teachers">
          <TeachersList searchTerm={searchTerm} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UserManagementPage;
