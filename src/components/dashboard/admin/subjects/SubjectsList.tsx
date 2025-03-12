
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

interface SubjectsListProps {
  searchTerm?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  gradeLevel: string;
  department: string;
  status: 'active' | 'inactive';
}

const SubjectsList = ({ searchTerm = '', onEdit, onDelete }: SubjectsListProps) => {
  // In a real app, this data would come from Supabase
  const subjects: Subject[] = [
    { id: '1', name: 'Mathematics', code: 'MATH101', gradeLevel: 'Grade 10', department: 'Science', status: 'active' },
    { id: '2', name: 'English Literature', code: 'ENG103', gradeLevel: 'Grade 11', department: 'Arts', status: 'active' },
    { id: '3', name: 'Physics', code: 'PHY201', gradeLevel: 'Grade 12', department: 'Science', status: 'active' },
    { id: '4', name: 'History', code: 'HIS102', gradeLevel: 'Grade 9', department: 'Humanities', status: 'inactive' },
    { id: '5', name: 'Computer Science', code: 'CS101', gradeLevel: 'Grade 11', department: 'Technology', status: 'active' },
  ].filter(subject => 
    searchTerm === '' || 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Subject['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Grade Level</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                {searchTerm ? 'No subjects found matching your search.' : 'No subjects available.'}
              </TableCell>
            </TableRow>
          ) : (
            subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>{subject.code}</TableCell>
                <TableCell>{subject.gradeLevel}</TableCell>
                <TableCell>{subject.department}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(subject.status)}>
                    {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => onEdit(subject.id)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => onDelete(subject.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubjectsList;
