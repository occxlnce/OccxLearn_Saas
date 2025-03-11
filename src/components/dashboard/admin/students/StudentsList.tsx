
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

interface StudentsListProps {
  searchTerm?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  status: 'active' | 'inactive' | 'suspended';
}

const StudentsList = ({ searchTerm = '' }: StudentsListProps) => {
  // In a real app, this data would come from Supabase
  const students: Student[] = [
    { id: '1', name: 'John Smith', email: 'john.smith@example.com', class: 'Grade 10A', status: 'active' },
    { id: '2', name: 'Emily Jones', email: 'emily.jones@example.com', class: 'Grade 9B', status: 'active' },
    { id: '3', name: 'Michael Brown', email: 'michael.brown@example.com', class: 'Grade 11C', status: 'inactive' },
    { id: '4', name: 'Sarah Davis', email: 'sarah.davis@example.com', class: 'Grade 10A', status: 'active' },
    { id: '5', name: 'David Wilson', email: 'david.wilson@example.com', class: 'Grade 12D', status: 'suspended' },
  ].filter(student => 
    searchTerm === '' || 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500 hover:bg-green-600';
      case 'inactive': return 'bg-amber-500 hover:bg-amber-600';
      case 'suspended': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                {searchTerm ? 'No students found matching your search.' : 'No students available.'}
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(student.status)} text-white`}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
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

export default StudentsList;
