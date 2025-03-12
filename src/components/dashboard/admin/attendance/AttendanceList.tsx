
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
import { Edit, Calendar, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AttendanceListProps {
  searchTerm?: string;
}

interface Attendance {
  id: string;
  student: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
}

const AttendanceList = ({ searchTerm = '' }: AttendanceListProps) => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // In a real app, this data would come from Supabase
  const attendanceRecords: Attendance[] = [
    { id: '1', student: 'John Smith', class: 'Grade 10A - Mathematics', date: '2023-06-15', status: 'present', markedBy: 'Dr. Jessica Miller' },
    { id: '2', student: 'Emily Jones', class: 'Grade 9B - English', date: '2023-06-15', status: 'absent', markedBy: 'Prof. Robert Johnson' },
    { id: '3', student: 'Michael Brown', class: 'Grade 11C - Physics', date: '2023-06-14', status: 'late', markedBy: 'Ms. Amanda Lee' },
    { id: '4', student: 'Sarah Davis', class: 'Grade 10A - Mathematics', date: '2023-06-14', status: 'present', markedBy: 'Dr. Jessica Miller' },
    { id: '5', student: 'David Wilson', class: 'Grade 12D - Computer Science', date: '2023-06-13', status: 'excused', markedBy: 'Dr. Thomas Brown' },
  ].filter(record => {
    // Apply search filter
    const searchMatch = searchTerm === '' || 
      record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.date.includes(searchTerm) ||
      record.markedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply class filter
    const classMatch = selectedClass === 'all' || record.class.includes(selectedClass);
    
    // Apply status filter
    const statusMatch = selectedStatus === 'all' || record.status === selectedStatus;
    
    return searchMatch && classMatch && statusMatch;
  });

  const getStatusColor = (status: Attendance['status']) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'danger';
      case 'late': return 'warning';
      case 'excused': return 'info';
      default: return 'secondary';
    }
  };

  const classes = ['Grade 10A - Mathematics', 'Grade 9B - English', 'Grade 11C - Physics', 'Grade 12D - Computer Science'];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1">Filter by Class</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((className, index) => (
                <SelectItem key={index} value={className}>{className}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1">Filter by Status</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="late">Late</SelectItem>
              <SelectItem value="excused">Excused</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4 flex items-end">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Marked By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No attendance records match your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              attendanceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.student}</TableCell>
                  <TableCell>{record.class}</TableCell>
                  <TableCell>{formatDate(record.date)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(record.status)}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.markedBy}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Calendar className="h-4 w-4" />
                        <span className="sr-only">View History</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AttendanceList;
