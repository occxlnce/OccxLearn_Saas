
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AddSyllabusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AddSyllabusDialog = ({ 
  open, 
  onOpenChange,
  onSuccess 
}: AddSyllabusDialogProps) => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('draft');
  const [level, setLevel] = useState('secondary');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !grade) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('syllabus')
        .insert([{
          subject,
          grade,
          description,
          status,
          level
        }]);
      
      if (error) throw error;
      
      toast.success('Syllabus added successfully');
      resetForm();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error adding syllabus:', error);
      toast.error('Failed to add syllabus');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubject('');
    setGrade('');
    setDescription('');
    setStatus('draft');
    setLevel('secondary');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Syllabus</DialogTitle>
          <DialogDescription>
            Create a new syllabus for your school curriculum.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Name *</Label>
              <Input 
                id="subject" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="e.g., Mathematics - Algebra I"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">Grade Level *</Label>
              <Select value={grade} onValueChange={setGrade}>
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
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Enter syllabus description"
              rows={5}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
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
              <Select value={level} onValueChange={setLevel}>
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
              {isSubmitting ? 'Adding...' : 'Add Syllabus'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSyllabusDialog;
