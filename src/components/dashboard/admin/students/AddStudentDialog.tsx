
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStudentAdded: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  classId: string;
};

const AddStudentDialog: React.FC<AddStudentDialogProps> = ({ open, onOpenChange, onStudentAdded }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>();
  
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

  const onSubmit = async (data: FormData) => {
    try {
      // First create the user in auth
      const { data: authData, error: authError } = await supabase.functions.invoke('create-user', {
        body: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'student',
          classId: data.classId
        }
      });

      if (authError) throw authError;

      // Log the activity
      await supabase.functions.invoke('log-activity', {
        body: {
          action: 'create_student',
          details: {
            studentName: `${data.firstName} ${data.lastName}`,
            email: data.email
          }
        }
      });

      toast.success('Student added successfully');
      reset();
      onOpenChange(false);
      onStudentAdded();
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('Failed to add student. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the student details below to create a new account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
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
                defaultValue={watch('classId')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes?.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.classId && <p className="text-xs text-red-500">{errors.classId.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;
