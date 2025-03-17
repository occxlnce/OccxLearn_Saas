
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import SubjectForm, { SubjectFormData } from './SubjectForm';

interface SubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjectId?: string | null;
  mode: 'add' | 'edit';
  onSuccess?: () => void;
}

const SubjectDialog: React.FC<SubjectDialogProps> = ({ 
  open, 
  onOpenChange, 
  subjectId, 
  mode,
  onSuccess 
}) => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<SubjectFormData | undefined>(undefined);

  useEffect(() => {
    if (mode === 'edit' && subjectId && open) {
      fetchSubjectData();
    } else {
      setInitialData(undefined);
    }
  }, [subjectId, open, mode]);

  const fetchSubjectData = async () => {
    if (!subjectId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('id', subjectId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setInitialData({
          id: data.id,
          name: data.name,
          code: data.code,
          gradeLevel: data.grade_level || '',
          department: data.department || '',
          status: (data.status as 'active' | 'inactive') || 'active'
        });
      }
    } catch (error) {
      console.error('Error fetching subject:', error);
      toast.error('Failed to load subject details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: SubjectFormData) => {
    try {
      setLoading(true);
      
      // Map the form data to the database structure
      const subjectData = {
        name: data.name,
        code: data.code,
        grade_level: data.gradeLevel,
        department: data.department,
        status: data.status,
      };
      
      let response;
      if (mode === 'add') {
        response = await supabase
          .from('subjects')
          .insert(subjectData);  // Remove the array brackets as Supabase v2 handles this
      } else {
        response = await supabase
          .from('subjects')
          .update(subjectData)
          .eq('id', subjectId);
      }
      
      const { error } = response;
      if (error) {
        console.error('Error response:', error);
        throw error;
      }
      
      toast.success(`Subject ${mode === 'add' ? 'added' : 'updated'} successfully`);
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error(`Error ${mode === 'add' ? 'adding' : 'updating'} subject:`, error);
      toast.error(`Failed to ${mode === 'add' ? 'add' : 'update'} subject: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Subject' : 'Edit Subject'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Fill in the details to add a new subject to the curriculum.' 
              : 'Update the subject details below.'}
          </DialogDescription>
        </DialogHeader>
        
        {loading && mode === 'edit' ? (
          <div className="py-6 text-center">Loading subject details...</div>
        ) : (
          <SubjectForm 
            initialData={initialData} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubjectDialog;
