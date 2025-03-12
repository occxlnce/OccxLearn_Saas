
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SubjectsList from '@/components/dashboard/admin/subjects/SubjectsList';
import SubjectForm, { SubjectFormData } from '@/components/dashboard/admin/subjects/SubjectForm';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const SubjectsManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [editingSubject, setEditingSubject] = useState<SubjectFormData | undefined>(undefined);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log(`Searching for subject: ${term}`);
  };

  const handleAddSubject = (data: SubjectFormData) => {
    // In a real app, this would be a call to Supabase
    console.log('Adding subject:', data);
    toast.success(`Subject "${data.name}" added successfully`);
    setShowAddDialog(false);
  };

  const handleEditSubject = (id: string) => {
    // In a real app, you would fetch the subject data from Supabase
    // For now, we'll use dummy data
    const dummySubject = {
      id,
      name: 'Mathematics',
      code: 'MATH101',
      gradeLevel: 'Grade 10',
      department: 'Science',
      status: 'active' as const
    };
    
    setEditingSubject(dummySubject);
    setShowEditDialog(true);
  };

  const handleUpdateSubject = (data: SubjectFormData) => {
    // In a real app, this would be a call to Supabase
    console.log('Updating subject:', data);
    toast.success(`Subject "${data.name}" updated successfully`);
    setShowEditDialog(false);
    setEditingSubject(undefined);
  };

  const handleDeletePrompt = (id: string) => {
    setSelectedSubjectId(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteSubject = () => {
    // In a real app, this would be a call to Supabase
    console.log('Deleting subject with ID:', selectedSubjectId);
    toast.success('Subject deleted successfully');
    setShowDeleteDialog(false);
    setSelectedSubjectId(null);
  };

  return (
    <DashboardLayout role="admin" pageTitle="Subject Management">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-1/2">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search subjects by name, code or department..." 
          />
        </div>
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Subject
        </Button>
      </div>
      
      <SubjectsList 
        searchTerm={searchTerm} 
        onEdit={handleEditSubject}
        onDelete={handleDeletePrompt}
      />

      {/* Add Subject Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>
              Fill in the form below to add a new subject to the system.
            </DialogDescription>
          </DialogHeader>
          <SubjectForm 
            onSubmit={handleAddSubject}
            onCancel={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Subject Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>
              Update the subject details below.
            </DialogDescription>
          </DialogHeader>
          <SubjectForm 
            initialData={editingSubject}
            onSubmit={handleUpdateSubject}
            onCancel={() => {
              setShowEditDialog(false);
              setEditingSubject(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Delete Subject</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this subject? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteSubject}
            >
              Delete Subject
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default SubjectsManagementPage;
