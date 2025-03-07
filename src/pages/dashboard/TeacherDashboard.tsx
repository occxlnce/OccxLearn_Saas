
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, ClipboardCheck, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeacherDashboard = () => {
  const classes = [
    {
      className: 'Mathematics - Grade 10',
      time: '9:00 AM - 10:30 AM',
      room: 'Room 101',
      students: 32,
      attendanceRate: '95%',
    },
    {
      className: 'Physics - Grade 11',
      time: '11:00 AM - 12:30 PM',
      room: 'Room 203',
      students: 28,
      attendanceRate: '92%',
    },
    {
      className: 'Computer Science - Grade 12',
      time: '2:00 PM - 3:30 PM',
      room: 'Lab 3',
      students: 24,
      attendanceRate: '96%',
    },
  ];

  const recentUploads = [
    {
      title: 'Linear Algebra Notes',
      subject: 'Mathematics',
      date: 'Today, 10:15 AM',
      type: 'PDF',
    },
    {
      title: 'Physics Lab Report Template',
      subject: 'Physics',
      date: 'Yesterday, 3:30 PM',
      type: 'DOCX',
    },
    {
      title: 'Programming Exercise Solutions',
      subject: 'Computer Science',
      date: '2 days ago',
      type: 'ZIP',
    },
  ];

  return (
    <DashboardLayout role="teacher" pageTitle="Teacher Dashboard">
      <div className="grid gap-6">
        {/* Teacher Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">My Classes</CardTitle>
              <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+1</span> from last semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <div className="p-2 rounded-full bg-purple-100 text-purple-700">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+6</span> from last semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Content Uploads</CardTitle>
              <div className="p-2 rounded-full bg-amber-100 text-amber-700">
                <FileText className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+8</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <div className="p-2 rounded-full bg-green-100 text-green-700">
                <ClipboardCheck className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.3%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+1.2%</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today's Classes</CardTitle>
              <CardDescription>Your scheduled classes for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.map((cls, index) => (
                  <div key={index} className="flex flex-col bg-secondary rounded-md p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{cls.className}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>{cls.time}</span>
                        </div>
                      </div>
                      <div className="text-sm">{cls.room}</div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{cls.students} students</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                          <span>{cls.attendanceRate} attendance</span>
                        </div>
                      </div>
                      <div>
                        <Button size="sm">Take Attendance</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Uploads */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>Your latest content uploads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUploads.map((upload, index) => (
                <div key={index} className="flex items-start border-b last:border-0 pb-4 last:pb-0">
                  <div className="p-2 bg-secondary rounded mr-3">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{upload.title}</p>
                    <p className="text-sm text-muted-foreground">{upload.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{upload.date}</span>
                      <span className="px-1.5 py-0.5 bg-secondary text-xs rounded">{upload.type}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Upload New Content
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
