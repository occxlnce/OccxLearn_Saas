
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DeleteSubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjectId: string | null;
  subjectName?: string;
  onSuccess?: () => void;
}

const DeleteSubjectDialog: React.FC<DeleteSubjectDialogProps> = ({ 
  open, 
  onOpenChange, 
  subjectId,
  subjectName,
  onSuccess
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!subjectId) return;
    
    try {
      setIsDeleting(true);
      
      // Check if user is authenticated
      const { data: authData } = await supabase.auth.getSession();
      if (!authData.session) {
        toast.error('You must be signed in to perform this action');
        setIsDeleting(false);
        return;
      }
      
      const { error } = await supabase
        .from('subjects')
        .delete()
        .eq('id', subjectId);
      
      if (error) throw error;
      
      toast.success('Subject deleted successfully');
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error deleting subject:', error);
      toast.error(`Failed to delete subject: ${error.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the subject {subjectName ? <strong>"{subjectName}"</strong> : ''} 
            and remove all associated data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSubjectDialog;
