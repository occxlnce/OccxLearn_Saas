
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
import AddStudentDialog from './AddStudentDialog';
import ViewStudentDialog from './ViewStudentDialog';
import EditStudentDialog from './EditStudentDialog';

interface StudentsListProps {
  searchTerm?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  status: 'active' | 'inactive' | 'suspended';
}

const StudentsList = ({ searchTerm = '' }: StudentsListProps) => {
  const queryClient = useQueryClient();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  // Fetch students data from Supabase
  const { data: students, isLoading, error } = useQuery({
    queryKey: ['students', searchTerm],
    queryFn: async () => {
      const query = supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          email,
          class_id,
          status,
          classes:class_id(name)
        `)
        .eq('role', 'student');
        
      // Apply search filter if provided
      if (searchTerm) {
        query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }
        
      const { data, error } = await query;
      
      if (error) throw error;
      
      return data.map(student => ({
        id: student.id,
        name: `${student.first_name} ${student.last_name}`,
        email: student.email,
        class: student.classes?.name || 'Not assigned',
        status: (student.status || 'active') as 'active' | 'inactive' | 'suspended'
      })) as Student[];
    }
  });

  // Subscribe to realtime changes when component mounts
  React.useEffect(() => {
    const channel = supabase
      .channel('profiles-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles', filter: 'role=eq.student' }, 
        () => {
          // Invalidate the query to refresh the data
          queryClient.invalidateQueries({ queryKey: ['students'] });
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleDeleteStudent = async (studentId: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        // We don't actually delete the user, just update their status to 'inactive'
        const { error } = await supabase.functions.invoke('update-user-status', {
          body: { userId: studentId, status: 'inactive' }
        });
        
        if (error) throw error;
        
        // Log the activity
        await supabase.functions.invoke('log-activity', {
          body: {
            action: 'delete_student',
            details: {
              studentId
            }
          }
        });
        
        toast.success('Student deleted successfully');
        
        // Refresh the students list
        queryClient.invalidateQueries({ queryKey: ['students'] });
      } catch (error) {
        console.error('Error deleting student:', error);
        toast.error('Failed to delete student');
      }
    }
  };

  const handleViewStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setViewDialogOpen(true);
  };

  const handleEditStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setEditDialogOpen(true);
  };

  const handleAddStudent = () => {
    setAddDialogOpen(true);
  };

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'suspended': return 'danger';
      default: return 'secondary';
    }
  };

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error loading students: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddStudent}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Student
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading students...
                </TableCell>
              </TableRow>
            ) : students && students.length > 0 ? (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(student.status)}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewStudent(student.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditStudent(student.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDeleteStudent(student.id)}
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
                  {searchTerm ? 'No students found matching your search.' : 'No students available.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Dialogs */}
      <AddStudentDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onStudentAdded={() => queryClient.invalidateQueries({ queryKey: ['students'] })}
      />
      
      <ViewStudentDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        studentId={selectedStudentId}
      />
      
      <EditStudentDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        studentId={selectedStudentId}
        onStudentUpdated={() => queryClient.invalidateQueries({ queryKey: ['students'] })}
      />
    </>
  );
};

export default StudentsList;
