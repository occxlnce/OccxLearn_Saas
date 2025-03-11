
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
import { Edit, Trash2, Eye, Download } from 'lucide-react';

interface SyllabusListProps {
  searchTerm?: string;
}

interface Syllabus {
  id: string;
  subject: string;
  grade: string;
  lastUpdated: string;
  status: 'published' | 'draft' | 'archived';
}

const SyllabusList = ({ searchTerm = '' }: SyllabusListProps) => {
  // In a real app, this data would come from Supabase
  const syllabusList: Syllabus[] = [
    { id: '1', subject: 'Mathematics', grade: 'Grade 10', lastUpdated: '2 days ago', status: 'published' },
    { id: '2', subject: 'English Literature', grade: 'Grade 11', lastUpdated: '1 week ago', status: 'published' },
    { id: '3', subject: 'Physics', grade: 'Grade 12', lastUpdated: '3 days ago', status: 'draft' },
    { id: '4', subject: 'History', grade: 'Grade 9', lastUpdated: '1 month ago', status: 'published' },
    { id: '5', subject: 'Computer Science', grade: 'Grade 11', lastUpdated: '2 weeks ago', status: 'archived' },
  ].filter(syllabus => 
    searchTerm === '' || 
    syllabus.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    syllabus.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Syllabus['status']) => {
    switch (status) {
      case 'published': return 'bg-green-500 hover:bg-green-600';
      case 'draft': return 'bg-amber-500 hover:bg-amber-600';
      case 'archived': return 'bg-gray-500 hover:bg-gray-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {syllabusList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                {searchTerm ? 'No syllabus found matching your search.' : 'No syllabus available.'}
              </TableCell>
            </TableRow>
          ) : (
            syllabusList.map((syllabus) => (
              <TableRow key={syllabus.id}>
                <TableCell className="font-medium">{syllabus.subject}</TableCell>
                <TableCell>{syllabus.grade}</TableCell>
                <TableCell>{syllabus.lastUpdated}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(syllabus.status)} text-white`}>
                    {syllabus.status.charAt(0).toUpperCase() + syllabus.status.slice(1)}
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
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
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

export default SyllabusList;
