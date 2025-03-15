
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentsList from '@/components/dashboard/admin/students/StudentsList';
import TeachersList from '@/components/dashboard/admin/teachers/TeachersList';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus } from 'lucide-react';
import AddStudentDialog from '@/components/dashboard/admin/students/AddStudentDialog';
import AddTeacherDialog from '@/components/dashboard/admin/teachers/AddTeacherDialog';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const UserManagementPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false);
  const [addTeacherDialogOpen, setAddTeacherDialogOpen] = useState(false);
  
  const location = useLocation();
  
  // Check if we have a search term in the location state (from navigation)
  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddUser = () => {
    if (activeTab === 'students') {
      setAddStudentDialogOpen(true);
    } else {
      setAddTeacherDialogOpen(true);
    }
  };

  return (
    <DashboardLayout role="admin" pageTitle="User Management">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-1/2">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder={`Search ${activeTab}...`}
            initialValue={searchTerm}
          />
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddUser}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add New {activeTab === 'students' ? 'Student' : 'Teacher'}
        </Button>
      </div>
      
      <Tabs 
        defaultValue="students" 
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          setSearchTerm(''); // Clear search when changing tabs
        }}
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
      
      {/* Dialogs for adding new users */}
      <AddStudentDialog 
        open={addStudentDialogOpen} 
        onOpenChange={setAddStudentDialogOpen}
        onStudentAdded={() => {
          queryClient.invalidateQueries({ queryKey: ['students'] });
        }}
      />
      
      <AddTeacherDialog 
        open={addTeacherDialogOpen} 
        onOpenChange={setAddTeacherDialogOpen}
        onTeacherAdded={() => {
          queryClient.invalidateQueries({ queryKey: ['teachers'] });
        }}
      />
    </DashboardLayout>
  );
};

export default UserManagementPage;
