
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface Subject {
  id: string;
  name: string;
  code: string;
  grade_level?: string;
  department?: string;
  status: 'active' | 'inactive';
  description?: string;
  created_at?: string;
  updated_at?: string;
  school_id?: string;
}

interface SubjectListItemProps {
  subject: Subject;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const SubjectListItem: React.FC<SubjectListItemProps> = ({ 
  subject, 
  onEdit, 
  onDelete,
  onView 
}) => {
  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge variant="success">Active</Badge>;
    } else {
      return <Badge variant="secondary">Inactive</Badge>;
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{subject.code}</TableCell>
      <TableCell>{subject.name}</TableCell>
      <TableCell>{subject.department || 'N/A'}</TableCell>
      <TableCell>{subject.grade_level || 'N/A'}</TableCell>
      <TableCell>{getStatusBadge(subject.status)}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => onView(subject.id)}>
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
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
  );
};

export default SubjectListItem;
