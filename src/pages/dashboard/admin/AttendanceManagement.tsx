import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SearchBar from '@/components/dashboard/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AttendanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Fetch classes
  const { data: classes } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classes')
        .select('id, name');
      
      if (error) throw error;
      return data || [];
    }
  });
  
  // Fetch students for selected class
  const { data: students, isLoading: isLoadingStudents } = useQuery({
    queryKey: ['class-students', selectedClass],
    queryFn: async () => {
      if (!selectedClass) return [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .eq('class_id', selectedClass)
        .eq('role', 'student');
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedClass
  });
  
  // Filter students based on search term
  const filteredStudents = students?.filter(student => 
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    // In a real app, this would save to the database
    console.log(`Marking ${studentId} as ${status} for ${selectedDate?.toDateString()}`);
  };
  
  return (
    <DashboardLayout role="admin" pageTitle="Attendance Management">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Attendance Management</h1>
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search students..." 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Class</CardTitle>
              <CardDescription>Select a class to manage attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedClass} value={selectedClass || undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes?.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Date</CardTitle>
              <CardDescription>Select a date to record attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Today's attendance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Students:</span>
                  <span className="font-medium">{students?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Present:</span>
                  <span className="font-medium text-green-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Absent:</span>
                  <span className="font-medium text-red-600">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Late:</span>
                  <span className="font-medium text-amber-600">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Attendance Register</CardTitle>
            <CardDescription>
              {selectedClass && selectedDate 
                ? `Recording attendance for ${selectedDate.toDateString()}` 
                : 'Select a class and date to record attendance'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedClass ? (
              <div className="text-center py-8 text-muted-foreground">
                Please select a class to view students
              </div>
            ) : isLoadingStudents ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading students...
              </div>
            ) : filteredStudents && filteredStudents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.first_name} {student.last_name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Not Recorded</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                            onClick={() => handleMarkAttendance(student.id, 'present')}
                          >
                            Present
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
                            onClick={() => handleMarkAttendance(student.id, 'late')}
                          >
                            Late
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                            onClick={() => handleMarkAttendance(student.id, 'absent')}
                          >
                            Absent
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? 'No students found matching your search.' : 'No students in this class.'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AttendanceManagement;
