
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface ViewStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string | null;
}

const ViewStudentDialog: React.FC<ViewStudentDialogProps> = ({ open, onOpenChange, studentId }) => {
  const { data: student, isLoading } = useQuery({
    queryKey: ['student', studentId],
    queryFn: async () => {
      if (!studentId) return null;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id, 
            email, 
            first_name, 
            last_name, 
            role, 
            class_id,
            classes:class_id(name)
          `)
          .eq('id', studentId)
          .single();
        
        if (error) throw error;
        
        // Add status property since it's not in the database yet
        return { ...data, status: 'active' };
      } catch (error) {
        console.error('Error fetching student:', error);
        return null;
      }
    },
    enabled: !!studentId && open
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : student ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-gray-500">{student.first_name} {student.last_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Class</p>
                <p className="text-sm text-gray-500">{student.classes?.name || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="text-sm text-gray-500 capitalize">{student.role}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm text-gray-500 capitalize">{student.status || 'Active'}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Student not found</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStudentDialog;
