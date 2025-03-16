
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface EditSyllabusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  syllabusId: string | null;
  onSuccess?: () => void;
}

interface SyllabusFormData {
  subject: string;
  grade: string;
  description: string;
  status: string;
  level: string;
}

const EditSyllabusDialog: React.FC<EditSyllabusDialogProps> = ({ 
  open, 
  onOpenChange,
  syllabusId,
  onSuccess 
}) => {
  const [formData, setFormData] = useState<SyllabusFormData>({
    subject: '',
    grade: '',
    description: '',
    status: 'draft',
    level: 'secondary'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (syllabusId && open) {
      fetchSyllabusData();
    }
  }, [syllabusId, open]);

  const fetchSyllabusData = async () => {
    if (!syllabusId) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('syllabus')
        .select('*')
        .eq('id', syllabusId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setFormData({
          subject: data.subject,
          grade: data.grade,
          description: data.description || '',
          status: data.status,
          level: data.level
        });
      }
    } catch (error) {
      console.error('Error fetching syllabus:', error);
      toast.error('Failed to load syllabus details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof SyllabusFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!syllabusId) return;
    if (!formData.subject || !formData.grade) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('syllabus')
        .update({
          subject: formData.subject,
          grade: formData.grade,
          description: formData.description,
          status: formData.status,
          level: formData.level
        })
        .eq('id', syllabusId);
      
      if (error) throw error;
      
      toast.success('Syllabus updated successfully');
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error updating syllabus:', error);
      toast.error('Failed to update syllabus');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Syllabus</DialogTitle>
          <DialogDescription>
            Update the syllabus details below.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="py-6 text-center">Loading syllabus details...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Name *</Label>
                <Input 
                  id="subject" 
                  value={formData.subject} 
                  onChange={(e) => handleChange('subject', e.target.value)} 
                  placeholder="e.g., Mathematics - Algebra I"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="grade">Grade Level *</Label>
                <Select 
                  value={formData.grade} 
                  onValueChange={(value) => handleChange('grade', value)}
                >
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="K">Kindergarten</SelectItem>
                    <SelectItem value="1st">1st Grade</SelectItem>
                    <SelectItem value="2nd">2nd Grade</SelectItem>
                    <SelectItem value="3rd">3rd Grade</SelectItem>
                    <SelectItem value="4th">4th Grade</SelectItem>
                    <SelectItem value="5th">5th Grade</SelectItem>
                    <SelectItem value="6th">6th Grade</SelectItem>
                    <SelectItem value="7th">7th Grade</SelectItem>
                    <SelectItem value="8th">8th Grade</SelectItem>
                    <SelectItem value="9th">9th Grade</SelectItem>
                    <SelectItem value="10th">10th Grade</SelectItem>
                    <SelectItem value="11th">11th Grade</SelectItem>
                    <SelectItem value="12th">12th Grade</SelectItem>
                    <SelectItem value="Elective">Elective</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => handleChange('description', e.target.value)} 
                placeholder="Enter syllabus description"
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="level">Education Level</Label>
                <Select 
                  value={formData.level} 
                  onValueChange={(value) => handleChange('level', value)}
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Syllabus'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditSyllabusDialog;
