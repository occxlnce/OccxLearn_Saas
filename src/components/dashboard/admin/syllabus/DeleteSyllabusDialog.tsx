
import React, { useState } from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface DeleteSyllabusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  syllabusId: string | null;
  syllabusName: string;
  onSuccess?: () => void;
}

const DeleteSyllabusDialog: React.FC<DeleteSyllabusDialogProps> = ({ 
  open, 
  onOpenChange, 
  syllabusId,
  syllabusName,
  onSuccess 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!syllabusId) return;
    
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('syllabus')
        .delete()
        .eq('id', syllabusId);
      
      if (error) throw error;
      
      toast.success('Syllabus deleted successfully');
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error deleting syllabus:', error);
      toast.error('Failed to delete syllabus');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the syllabus <span className="font-semibold">{syllabusName}</span>. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSyllabusDialog;
