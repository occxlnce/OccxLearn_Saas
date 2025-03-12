
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';

export interface SubjectFormData {
  id?: string;
  name: string;
  code: string;
  gradeLevel: string;
  department: string;
  status: 'active' | 'inactive';
}

interface SubjectFormProps {
  initialData?: SubjectFormData;
  onSubmit: (data: SubjectFormData) => void;
  onCancel: () => void;
}

const defaultFormData: SubjectFormData = {
  name: '',
  code: '',
  gradeLevel: '',
  department: '',
  status: 'active'
};

const SubjectForm = ({ initialData, onSubmit, onCancel }: SubjectFormProps) => {
  const [formData, setFormData] = useState<SubjectFormData>(initialData || defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof SubjectFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof SubjectFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: keyof SubjectFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SubjectFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Subject name is required';
    }
    
    if (!formData.code.trim()) {
      newErrors.code = 'Subject code is required';
    }
    
    if (!formData.gradeLevel.trim()) {
      newErrors.gradeLevel = 'Grade level is required';
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Subject Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Mathematics"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="code">Subject Code <span className="text-red-500">*</span></Label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g. MATH101"
              className={errors.code ? "border-red-500" : ""}
            />
            {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gradeLevel">Grade Level <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.gradeLevel} 
              onValueChange={(value) => handleSelectChange('gradeLevel', value)}
            >
              <SelectTrigger id="gradeLevel" className={errors.gradeLevel ? "border-red-500" : ""}>
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
                <SelectItem value="Grade 11">Grade 11</SelectItem>
                <SelectItem value="Grade 12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            {errors.gradeLevel && <p className="text-red-500 text-sm">{errors.gradeLevel}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.department} 
              onValueChange={(value) => handleSelectChange('department', value)}
            >
              <SelectTrigger id="department" className={errors.department ? "border-red-500" : ""}>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Humanities">Humanities</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Languages">Languages</SelectItem>
              </SelectContent>
            </Select>
            {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value) => handleSelectChange('status', value as 'active' | 'inactive')}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          {initialData ? 'Update Subject' : 'Add Subject'}
        </Button>
      </div>
    </form>
  );
};

export default SubjectForm;
