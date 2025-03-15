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
import { Edit, Trash2, Eye, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface AttendanceListProps {
  searchTerm?: string;
}

interface Attendance {
  id: string;
  student: string;
  class: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  markedBy: string;
}

const AttendanceList = ({ searchTerm = '' }: AttendanceListProps) => {
  // Mock data for attendance records
  const mockAttendance: Attendance[] = [
    {
      id: '1',
      student: 'Sarah Johnson',
      class: '10th Grade - Math',
      date: '2023-09-12',
      status: 'present',
      markedBy: 'Mr. Thompson'
    },
    {
      id: '2',
      student: 'Alex Williams',
      class: '9th Grade - Science',
      date: '2023-09-12',
      status: 'absent',
      markedBy: 'Ms. Rodriguez'
    },
    {
      id: '3',
      student: 'James Miller',
      class: '11th Grade - English',
      date: '2023-09-12',
      status: 'late',
      markedBy: 'Mr. Patel'
    },
    {
      id: '4',
      student: 'Emma Wilson',
      class: '10th Grade - History',
      date: '2023-09-12',
      status: 'excused',
      markedBy: 'Ms. Chen'
    },
    {
      id: '5',
      student: 'Ryan Thomas',
      class: '12th Grade - Computer Science',
      date: '2023-09-12',
      status: 'present',
      markedBy: 'Dr. Gupta'
    }
  ];

  const [attendance, setAttendance] = React.useState(mockAttendance);

  // Filter attendance records based on search term
  const filteredAttendance = attendance.filter(
    (record) =>
      record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.date.includes(searchTerm) ||
      record.markedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkAttendance = (recordId: string, newStatus: Attendance['status']) => {
    setAttendance((prev) =>
      prev.map((record) =>
        record.id === recordId ? { ...record, status: newStatus } : record
      )
    );
    toast.success(`Attendance marked as ${newStatus} for ${attendance.find(r => r.id === recordId)?.student}`);
  };

  const handleViewAttendance = (recordId: string) => {
    toast('View attendance record with ID: ' + recordId);
  };

  const handleEditAttendance = (recordId: string) => {
    toast('Edit attendance record with ID: ' + recordId);
  };

  const handleAddAttendance = () => {
    toast('Add new attendance record clicked');
  };

  const getStatusColor = (status: Attendance['status']) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'destructive';
      case 'late': return 'warning';
      case 'excused': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddAttendance}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Attendance
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.student}</TableCell>
                  <TableCell>{record.class}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(record.status)}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewAttendance(record.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditAttendance(record.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleMarkAttendance(record.id, 'present')}>
                        Present
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleMarkAttendance(record.id, 'absent')}>
                        Absent
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleMarkAttendance(record.id, 'late')}>
                        Late
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleMarkAttendance(record.id, 'excused')}>
                        Excused
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                        onClick={() => setAttendance((prev) => prev.filter((r) => r.id !== record.id))}
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
                  {searchTerm ? 'No attendance records found matching your search.' : 'No attendance records available.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AttendanceList;
