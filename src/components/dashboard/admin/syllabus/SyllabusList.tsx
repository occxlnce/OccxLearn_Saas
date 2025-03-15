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
}

interface Syllabus {
  id: string;
  subject: string;
  grade: string;
  lastUpdated: string;
  status: "published" | "draft" | "archived";
}

// Mock data for syllabus
const mockSyllabus: Syllabus[] = [
  {
    id: '1',
    subject: 'Mathematics - Algebra I',
    grade: '9th',
    lastUpdated: '2023-08-15',
    status: 'published'
  },
  {
    id: '2',
    subject: 'Science - Biology',
    grade: '10th',
    lastUpdated: '2023-08-20',
    status: 'published'
  },
  {
    id: '3',
    subject: 'English - Literature',
    grade: '11th',
    lastUpdated: '2023-08-25',
    status: 'draft'
  },
  {
    id: '4',
    subject: 'History - World Wars',
    grade: '12th',
    lastUpdated: '2023-08-28',
    status: 'published'
  },
  {
    id: '5',
    subject: 'Computer Science - Programming',
    grade: 'Elective',
    lastUpdated: '2023-07-10',
    status: 'archived'
  }
];

const SyllabusList = ({ searchTerm = '' }: SyllabusListProps) => {
  const [syllabus, setSyllabus] = useState<Syllabus[]>(mockSyllabus);

  // Filter syllabus based on search term
  const filteredSyllabus = syllabus.filter(
    (item) =>
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleAddSyllabus = () => {
    toast('Add new syllabus clicked');
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
    <>
      <div className="flex justify-end mb-4">
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddSyllabus}>
          <FileText className="w-4 h-4 mr-2" />
          Add New Syllabus
        </Button>
      </div>
      
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
    </>
  );
};

export default SyllabusList;
