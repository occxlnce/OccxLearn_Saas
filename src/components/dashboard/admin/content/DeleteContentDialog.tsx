
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

interface DeleteContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
  contentTitle: string;
  onSuccess?: () => void;
}

const DeleteContentDialog: React.FC<DeleteContentDialogProps> = ({ 
  open, 
  onOpenChange, 
  contentId,
  contentTitle,
  onSuccess 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!contentId) return;
    
    try {
      setIsDeleting(true);
      
      // Check if user is authenticated
      const { data: authData } = await supabase.auth.getSession();
      if (!authData.session) {
        toast.error('You must be signed in to perform this action');
        setIsDeleting(false);
        return;
      }
      
      // Get content details to check file URL
      const { data: contentData, error: contentError } = await supabase
        .from('contents')
        .select('file_url')
        .eq('id', contentId)
        .single();
      
      if (contentError) throw contentError;
      
      // Delete the content from the database
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('id', contentId);
      
      if (error) throw error;
      
      // If there was a file associated with the content, delete it from storage
      if (contentData?.file_url) {
        // Extract the path from the file URL
        const url = new URL(contentData.file_url);
        const pathParts = url.pathname.split('/');
        const fileKey = pathParts.slice(pathParts.indexOf('content-files') + 1).join('/');
        
        if (fileKey) {
          await supabase.storage
            .from('content-files')
            .remove([fileKey]);
        }
      }
      
      toast.success('Content deleted successfully');
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error deleting content:', error);
      toast.error(`Failed to delete content: ${error.message || 'Unknown error'}`);
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
            This will permanently delete the content <span className="font-semibold">{contentTitle}</span> and any associated files. 
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

export default DeleteContentDialog;
