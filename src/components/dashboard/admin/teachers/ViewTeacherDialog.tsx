
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface ViewTeacherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacherId: string | null;
}

const ViewTeacherDialog: React.FC<ViewTeacherDialogProps> = ({ open, onOpenChange, teacherId }) => {
  const { data: teacher, isLoading } = useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: async () => {
      if (!teacherId) return null;
      
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
      
      // Fetch classes taught by this teacher
      const { data: classesData } = await supabase
        .from('classes')
        .select('name')
        .eq('teacher_id', teacherId);
        
      return { ...data, classes: classesData || [] };
    },
    enabled: !!teacherId && open
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Teacher Details</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : teacher ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-gray-500">{teacher.first_name} {teacher.last_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-500">{teacher.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Classes</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {teacher.classes && teacher.classes.length > 0 ? (
                    teacher.classes.map((cls, idx) => (
                      <Badge key={idx} variant="outline" className="bg-black/5">
                        {cls.name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Not assigned to any classes</p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="text-sm text-gray-500 capitalize">{teacher.role}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Teacher not found</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTeacherDialog;
