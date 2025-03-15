
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';

interface AddTeacherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeacherAdded: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  subjects: string;
};

const AddTeacherDialog: React.FC<AddTeacherDialogProps> = ({ open, onOpenChange, onTeacherAdded }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    try {
      // Parse subjects from comma-separated list
      const subjectsList = data.subjects.split(',').map(subject => subject.trim());
      
      // First create the user in auth
      const { data: authData, error: authError } = await supabase.functions.invoke('create-user', {
        body: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'teacher',
          subjects: subjectsList
        }
      });

      if (authError) throw authError;

      // Log the activity
      await supabase.functions.invoke('log-activity', {
        body: {
          action: 'create_teacher',
          details: {
            teacherName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            subjects: subjectsList
          }
        }
      });

      toast.success('Teacher added successfully');
      reset();
      onOpenChange(false);
      onTeacherAdded();
    } catch (error) {
      console.error('Error adding teacher:', error);
      toast.error('Failed to add teacher. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
          <DialogDescription>
            Enter the teacher details below to create a new account.
          </DialogDescription>
        </DialogHeader>
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
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Teacher</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeacherDialog;
