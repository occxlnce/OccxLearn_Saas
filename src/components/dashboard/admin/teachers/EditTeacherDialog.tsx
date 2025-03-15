
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface EditTeacherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacherId: string | null;
  onTeacherUpdated: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  subjects: string;
  status: 'active' | 'inactive' | 'on leave';
};

const EditTeacherDialog: React.FC<EditTeacherDialogProps> = ({ open, onOpenChange, teacherId, onTeacherUpdated }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>();
  
  // Fetch teacher data
  const { data: teacher, isLoading } = useQuery({
    queryKey: ['teacher-edit', teacherId],
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
        
      return { 
        ...data, 
        classes: classesData || [],
        subjects: classesData?.map(c => c.name).join(', ') || ''
      };
    },
    enabled: !!teacherId && open
  });

  // Populate form when teacher data is loaded
  useEffect(() => {
    if (teacher) {
      setValue('firstName', teacher.first_name || '');
      setValue('lastName', teacher.last_name || '');
      setValue('email', teacher.email || '');
      setValue('subjects', teacher.subjects || '');
    }
  }, [teacher, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!teacherId) return;
    
    try {
      // Update the teacher profile
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
        })
        .eq('id', teacherId);

      if (error) throw error;

      // Log the activity
      await supabase.functions.invoke('log-activity', {
        body: {
          userId: teacherId,
          action: 'update_teacher',
          details: {
            teacherName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            subjects: data.subjects.split(',').map(s => s.trim())
          }
        }
      });

      toast.success('Teacher updated successfully');
      onOpenChange(false);
      onTeacherUpdated();
    } catch (error) {
      console.error('Error updating teacher:', error);
      toast.error('Failed to update teacher. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
          <DialogDescription>
            Update the teacher details below.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="py-4">Loading teacher data...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Jessica"
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Miller"
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
                  placeholder="jessica.miller@example.com"
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
                <Label htmlFor="subjects">Subjects (comma separated)</Label>
                <Input
                  id="subjects"
                  placeholder="Mathematics, Physics"
                  {...register('subjects', { required: 'At least one subject is required' })}
                />
                {errors.subjects && <p className="text-xs text-red-500">{errors.subjects.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select 
                  onValueChange={(value: 'active' | 'inactive' | 'on leave') => setValue('status', value)}
                  defaultValue={watch('status')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-xs text-red-500">{errors.status.message}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditTeacherDialog;
