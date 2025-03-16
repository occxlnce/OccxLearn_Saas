
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface ViewSyllabusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  syllabusId: string | null;
}

interface SyllabusDetails {
  id: string;
  subject: string;
  grade: string;
  description: string | null;
  status: string;
  level: string;
  created_at: string;
  updated_at: string;
}

const ViewSyllabusDialog: React.FC<ViewSyllabusDialogProps> = ({ 
  open, 
  onOpenChange, 
  syllabusId 
}) => {
  const [loading, setLoading] = useState(true);
  const [syllabus, setSyllabus] = useState<SyllabusDetails | null>(null);

  useEffect(() => {
    if (syllabusId && open) {
      fetchSyllabusDetails();
    }
  }, [syllabusId, open]);

  const fetchSyllabusDetails = async () => {
    if (!syllabusId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('syllabus')
        .select('*')
        .eq('id', syllabusId)
        .single();
      
      if (error) throw error;
      setSyllabus(data as SyllabusDetails);
    } catch (error) {
      console.error('Error fetching syllabus details:', error);
      toast.error('Failed to load syllabus details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge variant="success">Published</Badge>;
      case 'draft': return <Badge variant="warning">Draft</Badge>;
      case 'archived': return <Badge variant="secondary">Archived</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Syllabus Details</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="py-6 text-center">Loading syllabus details...</div>
        ) : syllabus ? (
          <div className="py-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{syllabus.subject}</h3>
                <p className="text-sm text-gray-500">Grade: {syllabus.grade}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(syllabus.status)}
                <Badge variant="outline">{syllabus.level === 'primary' ? 'Primary' : 'Secondary'}</Badge>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-700">{syllabus.description || 'No description provided.'}</p>
            </div>
            
            <div className="border-t pt-4 text-sm text-gray-500">
              <p>Created: {formatDate(syllabus.created_at)}</p>
              <p>Last updated: {formatDate(syllabus.updated_at)}</p>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-red-500">
            Syllabus not found or has been deleted.
          </div>
        )}
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSyllabusDialog;
