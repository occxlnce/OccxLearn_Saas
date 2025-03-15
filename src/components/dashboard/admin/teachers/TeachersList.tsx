
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, UserPlus } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AddTeacherDialog from './AddTeacherDialog';
import ViewTeacherDialog from './ViewTeacherDialog';
import EditTeacherDialog from './EditTeacherDialog';

interface TeachersListProps {
  searchTerm?: string;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  status: 'active' | 'inactive' | 'on leave';
}

const TeachersList = ({ searchTerm = '' }: TeachersListProps) => {
  const queryClient = useQueryClient();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  
  // Fetch teachers data from Supabase
  const { data: teachers, isLoading, error } = useQuery({
    queryKey: ['teachers', searchTerm],
    queryFn: async () => {
      const query = supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          email
        `)
        .eq('role', 'teacher');
        
      // Apply search filter if provided
      if (searchTerm) {
        query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }
        
      const { data, error } = await query;
      
      if (error) throw error;
      
      // For each teacher, we need to fetch their classes/subjects
      const enrichedTeachers = await Promise.all(
        data.map(async (teacher) => {
          const { data: classesData } = await supabase
            .from('classes')
            .select('name')
            .eq('teacher_id', teacher.id);
            
          return {
            id: teacher.id,
            name: `${teacher.first_name} ${teacher.last_name}`,
            email: teacher.email,
            subjects: classesData?.map(c => c.name) || ['Computer Science'],
            status: 'active' as 'active' | 'inactive' | 'on leave' // Default status
          };
        })
      );
      
      return enrichedTeachers;
    }
  });

  // Subscribe to realtime changes when component mounts
  React.useEffect(() => {
    const channel = supabase
      .channel('profiles-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles', filter: 'role=eq.teacher' }, 
        () => {
          // Invalidate the query to refresh the data
          queryClient.invalidateQueries({ queryKey: ['teachers'] });
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleDeleteTeacher = async (teacherId: string) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      try {
        // We don't actually delete the user, just update their status to 'inactive'
        const { error } = await supabase.functions.invoke('update-user-status', {
          body: { userId: teacherId, status: 'inactive' }
        });
        
        if (error) throw error;
        
        // Log the activity
        await supabase.functions.invoke('log-activity', {
          body: {
            action: 'delete_teacher',
            details: {
              teacherId
            }
          }
        });
        
        toast.success('Teacher deleted successfully');
        
        // Refresh the teachers list
        queryClient.invalidateQueries({ queryKey: ['teachers'] });
      } catch (error) {
        console.error('Error deleting teacher:', error);
        toast.error('Failed to delete teacher');
      }
    }
  };

  const handleViewTeacher = (teacherId: string) => {
    setSelectedTeacherId(teacherId);
    setViewDialogOpen(true);
  };

  const handleEditTeacher = (teacherId: string) => {
    setSelectedTeacherId(teacherId);
    setEditDialogOpen(true);
  };

  const handleAddTeacher = () => {
    setAddDialogOpen(true);
  };

  const getStatusColor = (status: Teacher['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'on leave': return 'info';
      default: return 'secondary';
    }
  };

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error loading teachers: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddTeacher}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Teacher
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading teachers...
                </TableCell>
              </TableRow>
            ) : teachers && teachers.length > 0 ? (
              teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject, index) => (
                        <Badge key={index} variant="outline" className="bg-black/5">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(teacher.status)}>
                      {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewTeacher(teacher.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditTeacher(teacher.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  {searchTerm ? 'No teachers found matching your search.' : 'No teachers available.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Dialogs */}
      <AddTeacherDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onTeacherAdded={() => queryClient.invalidateQueries({ queryKey: ['teachers'] })}
      />
      
      <ViewTeacherDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        teacherId={selectedTeacherId}
      />
      
      <EditTeacherDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        teacherId={selectedTeacherId}
        onTeacherUpdated={() => queryClient.invalidateQueries({ queryKey: ['teachers'] })}
      />
    </>
  );
};

export default TeachersList;
