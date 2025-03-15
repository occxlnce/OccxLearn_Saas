
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SearchBar from '@/components/dashboard/SearchBar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import SubjectsList from '@/components/dashboard/admin/subjects/SubjectsList';
import SubjectDialog from '@/components/dashboard/admin/subjects/SubjectDialog';
import DeleteSubjectDialog from '@/components/dashboard/admin/subjects/DeleteSubjectDialog';
import ViewSubjectDialog from '@/components/dashboard/admin/subjects/ViewSubjectDialog';
import { Subject } from '@/components/dashboard/admin/subjects/SubjectListItem';

const SubjectsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>('');

  useEffect(() => {
    fetchSubjects();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('public:subjects')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'subjects' }, 
        (payload) => {
          fetchSubjects(); // Refetch subjects when any change occurs
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchSubjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      
      setSubjects(data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast.error('Failed to load subjects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

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

  const filteredSubjects = subjects
    .filter(subject => 
      (subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (subject.description && subject.description.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .filter(subject => 
      departmentFilter === 'all' || 
      (subject.department && subject.department.toLowerCase() === departmentFilter.toLowerCase())
    );

  // Extract unique departments for the filter
  const departments = ['all', ...new Set(subjects
    .filter(subject => subject.department)
    .map(subject => subject.department as string)
  )];

  return (
    <DashboardLayout role="admin" pageTitle="Subjects Management">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Subjects Management</h1>
          <div className="flex w-full md:w-auto flex-col md:flex-row gap-2">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search subjects..." 
              className="w-full md:w-64"
            />
            <Select 
              value={departmentFilter} 
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <Button onClick={() => setAddDialogOpen(true)} className="bg-green-500 hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Add New Subject
          </Button>
        </div>

        <SubjectsList 
          subjects={filteredSubjects} 
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
