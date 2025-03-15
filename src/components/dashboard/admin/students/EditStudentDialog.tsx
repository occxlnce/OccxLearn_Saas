
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string | null;
  onStudentUpdated: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  classId: string;
  status: 'active' | 'inactive' | 'suspended';
};

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({ 
  open, 
  onOpenChange, 
  studentId, 
  onStudentUpdated 
}) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>();
  
  // Fetch student data
  const { data: student, isLoading: isLoadingStudent } = useQuery({
    queryKey: ['student', studentId],
    queryFn: async () => {
      if (!studentId) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id, 
          email, 
          first_name, 
          last_name,
          status,
          class_id
        `)
        .eq('id', studentId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!studentId && open
  });

  // Fetch classes for dropdown
  const { data: classes } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classes')
        .select('id, name');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Populate form when student data is loaded
  useEffect(() => {
    if (student) {
      setValue('firstName', student.first_name || '');
      setValue('lastName', student.last_name || '');
      setValue('email', student.email || '');
      setValue('classId', student.class_id || '');
      setValue('status', (student.status as 'active' | 'inactive' | 'suspended') || 'active');
    }
  }, [student, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!studentId) return;
    
    try {
      // Update profile data
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          class_id: data.classId || null,
          status: data.status
        })
        .eq('id', studentId);

      if (error) throw error;

      // If status changed to suspended, update auth user metadata
      if (data.status === 'suspended') {
        const { error: authError } = await supabase.functions.invoke('update-user-status', {
          body: { userId: studentId, status: 'suspended' }
        });
        
        if (authError) throw authError;
      }

      // Log the activity
      await supabase.functions.invoke('log-activity', {
        body: {
          action: 'update_student',
          details: {
            studentId,
            studentName: `${data.firstName} ${data.lastName}`
          }
        }
      });

      toast.success('Student updated successfully');
      onOpenChange(false);
      onStudentUpdated();
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Failed to update student. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update the student's information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {isLoadingStudent ? (
              <p>Loading student data...</p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Smith"
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.smith@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="class">Class</Label>
                  <Select 
                    onValueChange={(value) => setValue('classId', value)}
                    value={watch('classId')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {classes?.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    onValueChange={(value: 'active' | 'inactive' | 'suspended') => setValue('status', value)}
                    value={watch('status')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoadingStudent}>Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;
