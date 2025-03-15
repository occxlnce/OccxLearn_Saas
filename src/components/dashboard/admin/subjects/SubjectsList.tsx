
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Subject } from './SubjectListItem';
import SubjectListItem from './SubjectListItem';

interface SubjectsListProps {
  subjects: Subject[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  isLoading?: boolean;
}

const SubjectsList: React.FC<SubjectsListProps> = ({ 
  subjects, 
  onEdit, 
  onDelete, 
  onView,
  isLoading 
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading subjects...</div>;
  }

  if (subjects.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md">
        <p className="text-muted-foreground">No subjects found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Grade Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject) => (
            <SubjectListItem 
              key={subject.id} 
              subject={subject} 
              onEdit={onEdit} 
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubjectsList;
