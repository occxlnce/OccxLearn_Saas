
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface ViewSubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjectId: string | null;
}

const ViewSubjectDialog: React.FC<ViewSubjectDialogProps> = ({ 
  open, 
  onOpenChange, 
  subjectId 
}) => {
  const [subject, setSubject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && subjectId) {
      fetchSubjectData();
    }
  }, [open, subjectId]);

  const fetchSubjectData = async () => {
    if (!subjectId) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('id', subjectId)
        .single();
      
      if (error) throw error;
      setSubject(data);
    } catch (error) {
      console.error('Error fetching subject:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    let variant: 'default' | 'success' | 'warning' | 'secondary' = 'default';
    
    switch (status) {
      case 'active':
        variant = 'success';
        break;
      case 'inactive':
        variant = 'secondary';
        break;
    }
    
    return <Badge variant={variant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subject Details</DialogTitle>
          <DialogDescription>
            Detailed information about this subject.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="py-6">Loading subject information...</div>
        ) : subject ? (
          <div className="py-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Subject Code</h3>
              <p className="mt-1 text-base font-medium">{subject.code}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
              <p className="mt-1 text-base">{subject.name}</p>
            </div>
            
            {subject.description && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1 text-base">{subject.description}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
              <p className="mt-1 text-base capitalize">{subject.department || 'N/A'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Grade Level</h3>
              <p className="mt-1 text-base">{subject.grade_level || 'N/A'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <div className="mt-1">{getStatusBadge(subject.status || 'active')}</div>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            Subject information not found.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewSubjectDialog;
