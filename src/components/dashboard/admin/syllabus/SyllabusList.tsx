
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
import { Syllabus } from '@/hooks/useSyllabus';

interface SyllabusListProps {
  syllabus: Syllabus[];
  isLoading: boolean;
  searchTerm?: string;
  filter?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const SyllabusList = ({ 
  syllabus, 
  isLoading, 
  searchTerm = '', 
  filter = 'all',
  onEdit,
  onDelete,
  onView
}: SyllabusListProps) => {
  const getStatusColor = (status: Syllabus['status']) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'secondary';
      default: return 'default';
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading syllabus...</div>;
  }

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
          {syllabus.length > 0 ? (
            syllabus.map((item) => (
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
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => onView(item.id)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => onEdit(item.id)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => onDelete(item.id)}
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
