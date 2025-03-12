
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
import { Edit, Trash2, Eye } from 'lucide-react';

interface TeachersListProps {
  searchTerm?: string;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  status: 'active' | 'inactive' | 'on leave';
}

const TeachersList = ({ searchTerm = '' }: TeachersListProps) => {
  // In a real app, this data would come from Supabase
  const teachers: Teacher[] = [
    { id: '1', name: 'Dr. Jessica Miller', email: 'jessica.miller@example.com', subjects: ['Mathematics', 'Physics'], status: 'active' },
    { id: '2', name: 'Prof. Robert Johnson', email: 'robert.johnson@example.com', subjects: ['English Literature'], status: 'active' },
    { id: '3', name: 'Ms. Amanda Lee', email: 'amanda.lee@example.com', subjects: ['Biology', 'Chemistry'], status: 'on leave' },
    { id: '4', name: 'Mr. Kevin Clark', email: 'kevin.clark@example.com', subjects: ['History', 'Geography'], status: 'active' },
    { id: '5', name: 'Dr. Thomas Brown', email: 'thomas.brown@example.com', subjects: ['Computer Science'], status: 'inactive' },
  ].filter(teacher => 
    searchTerm === '' || 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: Teacher['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'on leave': return 'info';
      default: return 'secondary';
    }
  };

  return (
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
          {teachers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                {searchTerm ? 'No teachers found matching your search.' : 'No teachers available.'}
              </TableCell>
            </TableRow>
          ) : (
            teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline" className="bg-black/5">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(teacher.status)}>
                    {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
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

export default TeachersList;
