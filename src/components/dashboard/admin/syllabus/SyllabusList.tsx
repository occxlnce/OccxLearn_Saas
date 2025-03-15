
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
import { Edit, Trash2, Eye, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface SyllabusListProps {
  searchTerm?: string;
  filter?: string; // Added filter prop
}

interface Syllabus {
  id: string;
  subject: string;
  grade: string;
  lastUpdated: string;
  status: "published" | "draft" | "archived";
  level?: "primary" | "secondary"; // Added level property for filtering
}

// Mock data for syllabus
const mockSyllabus: Syllabus[] = [
  {
    id: '1',
    subject: 'Mathematics - Algebra I',
    grade: '9th',
    lastUpdated: '2023-08-15',
    status: 'published',
    level: 'secondary'
  },
  {
    id: '2',
    subject: 'Science - Biology',
    grade: '10th',
    lastUpdated: '2023-08-20',
    status: 'published',
    level: 'secondary'
  },
  {
    id: '3',
    subject: 'English - Literature',
    grade: '11th',
    lastUpdated: '2023-08-25',
    status: 'draft',
    level: 'secondary'
  },
  {
    id: '4',
    subject: 'History - World Wars',
    grade: '12th',
    lastUpdated: '2023-08-28',
    status: 'published',
    level: 'secondary'
  },
  {
    id: '5',
    subject: 'Computer Science - Programming',
    grade: 'Elective',
    lastUpdated: '2023-07-10',
    status: 'archived',
    level: 'secondary'
  },
  {
    id: '6',
    subject: 'Mathematics - Basic',
    grade: '3rd',
    lastUpdated: '2023-09-15',
    status: 'published',
    level: 'primary'
  },
  {
    id: '7',
    subject: 'Science - Nature',
    grade: '4th',
    lastUpdated: '2023-09-20',
    status: 'published',
    level: 'primary'
  }
];

const SyllabusList = ({ searchTerm = '', filter = 'all' }: SyllabusListProps) => {
  const [syllabus, setSyllabus] = useState<Syllabus[]>(mockSyllabus);

  // Filter syllabus based on search term and filter option
  const filteredSyllabus = syllabus.filter(item => {
    // Search term filter
    const matchesSearch = 
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.grade.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Level filter
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'primary' && item.level === 'primary') || 
      (filter === 'secondary' && item.level === 'secondary');
    
    return matchesSearch && matchesFilter;
  });

  const handleDeleteSyllabus = (syllabusId: string) => {
    if (confirm('Are you sure you want to delete this syllabus?')) {
      setSyllabus((prev) => prev.filter((item) => item.id !== syllabusId));
      toast.success('Syllabus deleted successfully');
    }
  };

  const handleViewSyllabus = (syllabusId: string) => {
    toast('View syllabus with ID: ' + syllabusId);
  };

  const handleEditSyllabus = (syllabusId: string) => {
    toast('Edit syllabus with ID: ' + syllabusId);
  };

  const getStatusColor = (status: Syllabus['status']) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'secondary';
      default: return 'default';
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
          {filteredSyllabus.length > 0 ? (
            filteredSyllabus.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.subject}</TableCell>
                <TableCell>{item.grade}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(item.status)}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewSyllabus(item.id)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditSyllabus(item.id)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDeleteSyllabus(item.id)}
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
                {searchTerm ? 'No syllabus found matching your search.' : 'No syllabus available.'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SyllabusList;
