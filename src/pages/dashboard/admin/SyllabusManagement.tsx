
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SearchBar from '@/components/dashboard/SearchBar';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SyllabusList from '@/components/dashboard/admin/syllabus/SyllabusList';
import AddSyllabusDialog from '@/components/dashboard/admin/syllabus/AddSyllabusDialog';
import { useSyllabus } from '@/hooks/useSyllabus';
import ViewSyllabusDialog from '@/components/dashboard/admin/syllabus/ViewSyllabusDialog';
import DeleteSyllabusDialog from '@/components/dashboard/admin/syllabus/DeleteSyllabusDialog';
import EditSyllabusDialog from '@/components/dashboard/admin/syllabus/EditSyllabusDialog';

const SyllabusManagement = () => {
  const {
    syllabus,
    isLoading,
    handleSearch,
    handleLevelFilter,
    fetchSyllabus
  } = useSyllabus();
  
  const [activeTab, setActiveTab] = useState('all');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedSyllabusId, setSelectedSyllabusId] = useState<string | null>(null);
  const [selectedSyllabusName, setSelectedSyllabusName] = useState<string>('');
  
  const handleEdit = (id: string) => {
    setSelectedSyllabusId(id);
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const syllabusItem = syllabus.find(s => s.id === id);
    setSelectedSyllabusId(id);
    if (syllabusItem) {
      setSelectedSyllabusName(syllabusItem.subject);
    }
    setDeleteDialogOpen(true);
  };

  const handleView = (id: string) => {
    setSelectedSyllabusId(id);
    setViewDialogOpen(true);
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
        
        <Tabs defaultValue="all" onValueChange={(value) => {
          setActiveTab(value);
          handleLevelFilter(value);
        }} className="flex-1 flex flex-col">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="primary">Primary</TabsTrigger>
            <TabsTrigger value="secondary">Secondary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="flex-1">
            <SyllabusList 
              syllabus={syllabus} 
              isLoading={isLoading}
              filter="all"
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabsContent>
          
          <TabsContent value="primary" className="flex-1">
            <SyllabusList 
              syllabus={syllabus} 
              isLoading={isLoading}
              filter="primary"
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabsContent>
          
          <TabsContent value="secondary" className="flex-1">
            <SyllabusList 
              syllabus={syllabus} 
              isLoading={isLoading}
              filter="secondary"
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <AddSyllabusDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSuccess={fetchSyllabus}
      />

      <EditSyllabusDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        syllabusId={selectedSyllabusId}
        onSuccess={fetchSyllabus}
      />

      <DeleteSyllabusDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        syllabusId={selectedSyllabusId}
        syllabusName={selectedSyllabusName}
        onSuccess={fetchSyllabus}
      />

      <ViewSyllabusDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        syllabusId={selectedSyllabusId}
      />
    </DashboardLayout>
  );
};

export default SyllabusManagement;
