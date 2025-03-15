
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SubjectsList from '@/components/dashboard/admin/subjects/SubjectsList';
import SubjectDialog from '@/components/dashboard/admin/subjects/SubjectDialog';
import DeleteSubjectDialog from '@/components/dashboard/admin/subjects/DeleteSubjectDialog';
import ViewSubjectDialog from '@/components/dashboard/admin/subjects/ViewSubjectDialog';
import SubjectsFilters from '@/components/dashboard/admin/subjects/SubjectsFilters';
import { useSubjects } from '@/hooks/useSubjects';

const SubjectsManagement = () => {
  const {
    subjects,
    isLoading,
    departments,
    departmentFilter,
    handleSearch,
    handleDepartmentFilter,
    fetchSubjects
  } = useSubjects();
  
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>('');

  const handleEdit = (id: string) => {
    setSelectedSubjectId(id);
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const subject = subjects.find(s => s.id === id);
    setSelectedSubjectId(id);
    if (subject) {
      setSelectedSubjectName(subject.name);
    }
    setDeleteDialogOpen(true);
  };

  const handleView = (id: string) => {
    setSelectedSubjectId(id);
    setViewDialogOpen(true);
  };

  return (
    <DashboardLayout role="admin" pageTitle="Subjects Management">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Subjects Management</h1>
          <SubjectsFilters 
            onSearch={handleSearch}
            onDepartmentChange={handleDepartmentFilter}
            departments={departments}
            departmentFilter={departmentFilter}
          />
        </div>

        <div className="mb-6">
          <Button onClick={() => setAddDialogOpen(true)} className="bg-green-500 hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Add New Subject
          </Button>
        </div>

        <SubjectsList 
          subjects={subjects} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          onView={handleView}
          isLoading={isLoading}
        />

        <SubjectDialog 
          open={addDialogOpen} 
          onOpenChange={setAddDialogOpen} 
          mode="add"
          onSuccess={fetchSubjects}
        />

        <SubjectDialog 
          open={editDialogOpen} 
          onOpenChange={setEditDialogOpen} 
          subjectId={selectedSubjectId}
          mode="edit"
          onSuccess={fetchSubjects}
        />

        <DeleteSubjectDialog 
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          subjectId={selectedSubjectId}
          subjectName={selectedSubjectName}
          onSuccess={fetchSubjects}
        />

        <ViewSubjectDialog 
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          subjectId={selectedSubjectId}
        />
      </div>
    </DashboardLayout>
  );
};

export default SubjectsManagement;
