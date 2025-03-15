import React, { useState } from 'react';
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
import { Edit, Trash2, Eye, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface SubjectsListProps {
  searchTerm?: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  gradeLevel: string;
  department: string;
  status: "active" | "inactive";
}

// Mock data for subjects
const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Algebra I',
    code: 'MATH101',
    gradeLevel: '9th',
    department: 'Mathematics',
    status: 'active'
  },
  {
    id: '2',
    name: 'Biology',
    code: 'BIO201',
    gradeLevel: '10th',
    department: 'Science',
    status: 'active'
  },
  {
    id: '3',
    name: 'World History',
    code: 'HIST301',
    gradeLevel: '11th',
    department: 'Humanities',
    status: 'active'
  },
  {
    id: '4',
    name: 'Computer Science',
    code: 'CS401',
    gradeLevel: '12th',
    department: 'Technology',
    status: 'active'
  },
  {
    id: '5',
    name: 'Physical Education',
    code: 'PE100',
    gradeLevel: 'All',
    department: 'Athletics',
    status: 'inactive'
  }
];

const SubjectsList = ({ searchTerm = '' }: SubjectsListProps) => {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);

  // Filter subjects based on search term
  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.gradeLevel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSubject = (subjectId: string) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      setSubjects((prev) => prev.filter((subject) => subject.id !== subjectId));
      toast.success('Subject deleted successfully');
    }
  };

  const handleViewSubject = (subjectId: string) => {
    toast('View subject with ID: ' + subjectId);
  };

  const handleEditSubject = (subjectId: string) => {
    toast('Edit subject with ID: ' + subjectId);
  };

  const handleAddSubject = () => {
    toast('Add new subject clicked');
  };

  const getStatusColor = (status: Subject['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      default: return 'default';
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddSubject}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Subject
        </Button>
      </div>
      
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
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
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
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewSubject(subject.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditSubject(subject.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDeleteSubject(subject.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {searchTerm ? 'No subjects found matching your search.' : 'No subjects available.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SubjectsList;
