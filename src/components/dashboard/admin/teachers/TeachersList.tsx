
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

interface TeachersListProps {
  searchTerm?: string;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  status: "active" | "inactive" | "on leave";
}

// Mock data for teachers
const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'John Thompson',
    email: 'john.thompson@example.com',
    subjects: ['Mathematics', 'Physics'],
    status: 'active'
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@example.com',
    subjects: ['Biology', 'Chemistry'],
    status: 'active'
  },
  {
    id: '3',
    name: 'Raj Patel',
    email: 'raj.patel@example.com',
    subjects: ['English Literature', 'History'],
    status: 'inactive'
  },
  {
    id: '4',
    name: 'Li Chen',
    email: 'li.chen@example.com',
    subjects: ['Art', 'Music'],
    status: 'on leave'
  },
  {
    id: '5',
    name: 'Amir Gupta',
    email: 'amir.gupta@example.com',
    subjects: ['Computer Science', 'Mathematics'],
    status: 'active'
  }
];

const TeachersList = ({ searchTerm = '' }: TeachersListProps) => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteTeacher = (teacherId: string) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== teacherId));
      toast.success('Teacher deleted successfully');
    }
  };

  const handleViewTeacher = (teacherId: string) => {
    toast('View teacher with ID: ' + teacherId);
  };

  const handleEditTeacher = (teacherId: string) => {
    toast('Edit teacher with ID: ' + teacherId);
  };

  const handleAddTeacher = () => {
    toast('Add new teacher clicked');
  };

  const getStatusColor = (status: Teacher['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'on leave': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddTeacher}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Teacher
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.subjects.join(', ')}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(teacher.status)}>
                      {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewTeacher(teacher.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditTeacher(teacher.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDeleteTeacher(teacher.id)}
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
                <TableCell colSpan={5} className="text-center py-8">
                  {searchTerm ? 'No teachers found matching your search.' : 'No teachers available.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TeachersList;
