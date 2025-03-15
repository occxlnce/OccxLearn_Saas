
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ViewTeacherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacherId: string | null;
}

const ViewTeacherDialog: React.FC<ViewTeacherDialogProps> = ({ 
  open, 
  onOpenChange, 
  teacherId 
}) => {
  // Fetch teacher data
  const { data: teacher, isLoading } = useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: async () => {
      if (!teacherId) return null;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id, 
            email, 
            first_name, 
            last_name,
            role
          `)
          .eq('id', teacherId)
          .single();
        
        if (error) throw error;
        
        // For a real app, you'd fetch subjects/classes from another table
        return { 
          ...data,
          status: 'active' // Default since we don't have this in DB yet
        };
      } catch (error) {
        console.error('Error fetching teacher:', error);
        return null;
      }
    },
    enabled: !!teacherId && open
  });

  const getStatusBadge = (status: string) => {
    let variant: 'default' | 'success' | 'warning' | 'secondary' = 'default';
    
    switch (status) {
      case 'active':
        variant = 'success';
        break;
      case 'inactive':
        variant = 'warning';
        break;
      case 'on leave':
        variant = 'secondary';
        break;
    }
    
    return <Badge variant={variant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Teacher Details</DialogTitle>
          <DialogDescription>
            View complete information about this teacher.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="py-6">Loading teacher information...</div>
        ) : teacher ? (
          <div className="py-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
              <p className="mt-1 text-base font-medium">{teacher.first_name || ''} {teacher.last_name || ''}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="mt-1 text-base">{teacher.email || ''}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
              <p className="mt-1 text-base capitalize">{teacher.role || 'teacher'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <div className="mt-1">{getStatusBadge(teacher.status || 'active')}</div>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            Teacher information not found.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewTeacherDialog;
