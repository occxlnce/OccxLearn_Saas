
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample classes
const classes = [
  { id: '1', name: 'Grade 10A - Mathematics' },
  { id: '2', name: 'Grade 11B - Physics' },
  { id: '3', name: 'Grade 12C - Computer Science' }
];

// Sample students for the selected class
const students = [
  { id: '1', name: 'John Smith', previousMarks: [85, 78, 92], average: 85 },
  { id: '2', name: 'Emily Jones', previousMarks: [92, 88, 95], average: 92 },
  { id: '3', name: 'Michael Brown', previousMarks: [76, 82, 78], average: 79 },
  { id: '4', name: 'Sarah Davis', previousMarks: [88, 85, 91], average: 88 },
  { id: '5', name: 'David Wilson', previousMarks: [72, 68, 75], average: 72 },
  { id: '6', name: 'Lisa Miller', previousMarks: [95, 92, 94], average: 94 },
  { id: '7', name: 'Robert Johnson', previousMarks: [82, 79, 84], average: 82 },
  { id: '8', name: 'Jennifer Garcia', previousMarks: [78, 81, 76], average: 78 }
];

// Sample assessment types
const assessmentTypes = ['Quiz', 'Assignment', 'Mid-Term', 'Final Exam', 'Project'];

const UploadMarks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('1');
  const [assessmentType, setAssessmentType] = useState('Quiz');
  const [marks, setMarks] = useState<Record<string, string>>({});
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkChange = (studentId: string, value: string) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: value
    }));
  };

  const getGradeColor = (mark: number) => {
    if (mark >= 90) return 'text-green-500';
    if (mark >= 80) return 'text-teal-500';
    if (mark >= 70) return 'text-blue-500';
    if (mark >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <DashboardLayout role="teacher" pageTitle="Upload Marks">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Assessment Marks</CardTitle>
              <CardDescription>Enter and manage student marks for assessments</CardDescription>
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
                Save Marks
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
              <label className="text-sm font-medium mb-1 block">Assessment Type</label>
              <Select value={assessmentType} onValueChange={setAssessmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assessment type" />
                </SelectTrigger>
                <SelectContent>
                  {assessmentTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Previous Marks</TableHead>
                <TableHead>Average</TableHead>
                <TableHead className="text-right">New Mark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {student.previousMarks.map((mark, index) => (
                        <Badge key={index} variant="outline" className={getGradeColor(mark)}>
                          {mark}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getGradeColor(student.average)}>
                      {student.average}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      className="w-20 inline-block text-right"
                      placeholder="0-100"
                      value={marks[student.id] || ''}
                      onChange={(e) => handleMarkChange(student.id, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default UploadMarks;
