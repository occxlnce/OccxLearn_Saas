
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Save, 
  Calendar, 
  FilePieChart,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Sample classes
const classes = [
  { id: '1', name: 'Grade 10A - Mathematics' },
  { id: '2', name: 'Grade 11B - Physics' },
  { id: '3', name: 'Grade 12C - Computer Science' }
];

// Sample students
const students = [
  { id: '1', name: 'John Smith', attendance: 92 },
  { id: '2', name: 'Emily Jones', attendance: 98 },
  { id: '3', name: 'Michael Brown', attendance: 85 },
  { id: '4', name: 'Sarah Davis', attendance: 89 },
  { id: '5', name: 'David Wilson', attendance: 75 },
  { id: '6', name: 'Lisa Miller', attendance: 95 },
  { id: '7', name: 'Robert Johnson', attendance: 82 },
  { id: '8', name: 'Jennifer Garcia', attendance: 91 }
];

const getAttendanceColor = (percentage: number) => {
  if (percentage >= 95) return 'bg-green-500';
  if (percentage >= 85) return 'bg-blue-500';
  if (percentage >= 75) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getAttendanceStatus = (percentage: number) => {
  if (percentage >= 95) return 'Excellent';
  if (percentage >= 85) return 'Good';
  if (percentage >= 75) return 'Average';
  return 'Poor';
};

const AttendancePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('1');
  const [activeTab, setActiveTab] = useState('take');
  const [attendanceValues, setAttendanceValues] = useState<Record<string, string>>({});
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceChange = (studentId: string, value: string) => {
    setAttendanceValues(prev => ({
      ...prev,
      [studentId]: value
    }));
  };

  return (
    <DashboardLayout role="teacher" pageTitle="Attendance">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="take">Take Attendance</TabsTrigger>
          <TabsTrigger value="view">View Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="take">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Mark Attendance</CardTitle>
                  <CardDescription>Record student attendance for today's class</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Save className="w-4 h-4 mr-2" />
                    Save Attendance
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mb-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Select Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(classItem => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Date</label>
                  <div className="flex items-center border rounded-md px-3 py-2 bg-background">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Current %</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map(student => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{student.attendance}%</span>
                          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getAttendanceColor(student.attendance)}`} 
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <RadioGroup 
                          className="flex space-x-4 justify-end" 
                          value={attendanceValues[student.id] || 'present'}
                          onValueChange={(value) => handleAttendanceChange(student.id, value)}
                        >
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="present" id={`present-${student.id}`} />
                            <Label htmlFor={`present-${student.id}`} className="text-xs">Present</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="late" id={`late-${student.id}`} />
                            <Label htmlFor={`late-${student.id}`} className="text-xs">Late</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="absent" id={`absent-${student.id}`} />
                            <Label htmlFor={`absent-${student.id}`} className="text-xs">Absent</Label>
                          </div>
                        </RadioGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="view">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Attendance Reports</CardTitle>
                  <CardDescription>View and analyze student attendance records</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Select defaultValue="1">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(classItem => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <FilePieChart className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Attendance %</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map(student => {
                    const present = Math.floor(student.attendance / 100 * 30);
                    const absent = Math.floor((100 - student.attendance) / 100 * 30);
                    const late = 30 - present - absent;
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-green-500 border-green-200">
                            {present} days
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-red-500 border-red-200">
                            {absent} days
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-yellow-500 border-yellow-200">
                            {late} days
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{student.attendance}%</span>
                            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${getAttendanceColor(student.attendance)}`} 
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getAttendanceStatus(student.attendance)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AttendancePage;
