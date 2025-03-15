import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SearchBar from '@/components/dashboard/SearchBar';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SyllabusList from '@/components/dashboard/admin/syllabus/SyllabusList';
import AddSyllabusDialog from '@/components/dashboard/admin/syllabus/AddSyllabusDialog';

const SyllabusManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  return (
    <DashboardLayout role="admin" pageTitle="Syllabus Management">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Syllabus Management</h1>
          <div className="flex items-center gap-4">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search syllabus..." 
            />
            <Button onClick={() => setAddDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="primary">Primary</TabsTrigger>
            <TabsTrigger value="secondary">Secondary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="flex-1">
            <SyllabusList searchTerm={searchTerm} filter="all" />
          </TabsContent>
          
          <TabsContent value="primary" className="flex-1">
            <SyllabusList searchTerm={searchTerm} filter="primary" />
          </TabsContent>
          
          <TabsContent value="secondary" className="flex-1">
            <SyllabusList searchTerm={searchTerm} filter="secondary" />
          </TabsContent>
        </Tabs>
      </div>
      
      <AddSyllabusDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen} 
      />
    </DashboardLayout>
  );
};

export default SyllabusManagement;
