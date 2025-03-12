
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AlertCircle, CheckCircle, Clock, Calendar } from 'lucide-react';

// Sample attendance data
const attendanceData = [
  {
    subject: 'Mathematics',
    total: 30,
    present: 28,
    absent: 1,
    late: 1,
    percentage: 93,
    history: [
      { id: '1', date: '2023-10-15', status: 'present', notes: '' },
      { id: '2', date: '2023-10-08', status: 'present', notes: '' },
      { id: '3', date: '2023-10-01', status: 'late', notes: 'Late by 10 minutes' },
      { id: '4', date: '2023-09-24', status: 'present', notes: '' },
      { id: '5', date: '2023-09-17', status: 'present', notes: '' },
      { id: '6', date: '2023-09-10', status: 'absent', notes: 'Medical leave' },
    ]
  },
  {
    subject: 'Physics',
    total: 25,
    present: 24,
    absent: 0,
    late: 1,
    percentage: 96,
    history: [
      { id: '7', date: '2023-10-14', status: 'present', notes: '' },
      { id: '8', date: '2023-10-07', status: 'present', notes: '' },
      { id: '9', date: '2023-09-30', status: 'present', notes: '' },
      { id: '10', date: '2023-09-23', status: 'present', notes: '' },
      { id: '11', date: '2023-09-16', status: 'late', notes: 'Late by 5 minutes' },
    ]
  },
  {
    subject: 'Computer Science',
    total: 28,
    present: 26,
    absent: 2,
    late: 0,
    percentage: 93,
    history: [
      { id: '12', date: '2023-10-13', status: 'present', notes: '' },
      { id: '13', date: '2023-10-06', status: 'present', notes: '' },
      { id: '14', date: '2023-09-29', status: 'absent', notes: 'Personal leave' },
      { id: '15', date: '2023-09-22', status: 'present', notes: '' },
      { id: '16', date: '2023-09-15', status: 'present', notes: '' },
      { id: '17', date: '2023-09-08', status: 'absent', notes: 'Medical leave' },
    ]
  },
  {
    subject: 'Biology',
    total: 22,
    present: 20,
    absent: 1,
    late: 1,
    percentage: 91,
    history: [
      { id: '18', date: '2023-10-12', status: 'present', notes: '' },
      { id: '19', date: '2023-10-05', status: 'present', notes: '' },
      { id: '20', date: '2023-09-28', status: 'late', notes: 'Late by 8 minutes' },
      { id: '21', date: '2023-09-21', status: 'present', notes: '' },
      { id: '22', date: '2023-09-14', status: 'absent', notes: 'Family emergency' },
    ]
  },
  {
    subject: 'Chemistry',
    total: 24,
    present: 23,
    absent: 0,
    late: 1,
    percentage: 96,
    history: [
      { id: '23', date: '2023-10-11', status: 'present', notes: '' },
      { id: '24', date: '2023-10-04', status: 'present', notes: '' },
      { id: '25', date: '2023-09-27', status: 'present', notes: '' },
      { id: '26', date: '2023-09-20', status: 'late', notes: 'Late by 3 minutes' },
      { id: '27', date: '2023-09-13', status: 'present', notes: '' },
    ]
  }
];

// Chart colors
const COLORS = ['#4ade80', '#f87171', '#facc15'];

const Attendance = () => {
  // Functions to get status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'present':
        return <Badge variant="success" className="capitalize">Present</Badge>;
      case 'absent':
        return <Badge variant="danger" className="capitalize">Absent</Badge>;
      case 'late':
        return <Badge variant="warning" className="capitalize">Late</Badge>;
      default:
        return <Badge className="capitalize">{status}</Badge>;
    }
  };

  // Calculate overall attendance percentage
  const calculateOverallAttendance = () => {
    const totalClasses = attendanceData.reduce((acc, curr) => acc + curr.total, 0);
    const totalPresent = attendanceData.reduce((acc, curr) => acc + curr.present, 0);
    return Math.round((totalPresent / totalClasses) * 100);
  };

  const overallPercentage = calculateOverallAttendance();

  return (
    <DashboardLayout role="student" pageTitle="Attendance">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Overall Attendance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Attendance</CardTitle>
            <CardDescription>Your attendance across all subjects</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={overallPercentage >= 90 ? "#4ade80" : overallPercentage >= 75 ? "#facc15" : "#f87171"}
                  strokeWidth="10"
                  strokeDasharray={`${overallPercentage * 2.51} 251`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute text-4xl font-bold">
                {overallPercentage}%
              </div>
            </div>
            
            {overallPercentage < 75 && (
              <div className="mt-4 bg-red-100/50 text-red-700 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Low Attendance Alert</p>
                  <p className="text-sm">Your overall attendance is below the required minimum of 75%. Please improve your attendance to avoid academic penalties.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Subject-wise Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
            <CardDescription>Breakdown by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData.map(item => ({
                      name: item.subject,
                      value: item.percentage
                    }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}%`}
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.percentage >= 90 ? COLORS[0] : entry.percentage >= 75 ? COLORS[2] : COLORS[1]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Attendance Tabs */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Attendance Details</CardTitle>
          <CardDescription>View your attendance records by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={attendanceData[0].subject}>
            <TabsList className="w-full mb-4 overflow-x-auto flex flex-nowrap">
              {attendanceData.map(subject => (
                <TabsTrigger key={subject.subject} value={subject.subject} className="whitespace-nowrap">
                  {subject.subject}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {attendanceData.map(subject => (
              <TabsContent key={subject.subject} value={subject.subject}>
                <div className="grid gap-4 md:grid-cols-4 mb-6">
                  <div className="bg-green-100/50 text-green-700 p-4 rounded-md flex flex-col justify-center items-center">
                    <CheckCircle className="h-6 w-6 mb-2" />
                    <span className="text-2xl font-bold">{subject.present}</span>
                    <span className="text-sm">Present</span>
                  </div>
                  <div className="bg-red-100/50 text-red-700 p-4 rounded-md flex flex-col justify-center items-center">
                    <AlertCircle className="h-6 w-6 mb-2" />
                    <span className="text-2xl font-bold">{subject.absent}</span>
                    <span className="text-sm">Absent</span>
                  </div>
                  <div className="bg-yellow-100/50 text-yellow-700 p-4 rounded-md flex flex-col justify-center items-center">
                    <Clock className="h-6 w-6 mb-2" />
                    <span className="text-2xl font-bold">{subject.late}</span>
                    <span className="text-sm">Late</span>
                  </div>
                  <div className="bg-blue-100/50 text-blue-700 p-4 rounded-md flex flex-col justify-center items-center">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span className="text-2xl font-bold">{subject.total}</span>
                    <span className="text-sm">Total Classes</span>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subject.history.map(record => (
                      <TableRow key={record.id}>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell>{record.notes || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Attendance;
