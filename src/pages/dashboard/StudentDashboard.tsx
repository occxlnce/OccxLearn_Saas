
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ClipboardCheck, FileText, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const StudentDashboard = () => {
  const upcomingClasses = [
    {
      subject: 'Mathematics',
      time: '10:00 AM - 11:30 AM',
      room: 'Room 101',
      teacher: 'Prof. Johnson',
    },
    {
      subject: 'Physics',
      time: '1:00 PM - 2:30 PM',
      room: 'Lab 204',
      teacher: 'Dr. Williams',
    },
  ];

  const recentMaterials = [
    {
      title: 'Differential Equations Notes',
      subject: 'Mathematics',
      date: 'Yesterday',
      type: 'PDF',
    },
    {
      title: 'Physics Lab Experiment Guide',
      subject: 'Physics',
      date: '2 days ago',
      type: 'PDF',
    },
    {
      title: 'English Literature Essay Topics',
      subject: 'English',
      date: '3 days ago',
      type: 'DOCX',
    },
  ];

  const assignments = [
    {
      title: 'Math Problem Set 5',
      subject: 'Mathematics',
      dueDate: 'Tomorrow, 11:59 PM',
      progress: 75,
    },
    {
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: 'May 15, 11:59 PM',
      progress: 30,
    },
    {
      title: 'English Essay Draft',
      subject: 'English',
      dueDate: 'May 20, 11:59 PM',
      progress: 10,
    },
  ];

  return (
    <DashboardLayout role="student" pageTitle="Student Dashboard">
      <div className="grid gap-6">
        {/* Student Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
              <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                <FileText className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.75</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+0.15</span> from last semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <div className="p-2 rounded-full bg-green-100 text-green-700">
                <ClipboardCheck className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96.5%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+1.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <div className="p-2 rounded-full bg-amber-100 text-amber-700">
                <BookOpen className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-red-500">3</span> due this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Materials</CardTitle>
              <div className="p-2 rounded-full bg-purple-100 text-purple-700">
                <FileText className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">+5</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes for today</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View Full Timetable
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((cls, index) => (
                    <div key={index} className="flex items-start bg-secondary rounded-md p-4">
                      <div className="mr-4 mt-1">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{cls.subject}</h3>
                          <span className="text-sm">{cls.room}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{cls.time}</p>
                        <p className="text-sm mt-2">{cls.teacher}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assignments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Current Assignments</CardTitle>
                  <CardDescription>Track your progress on assignments</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                        </div>
                        <div className="text-sm text-right">
                          <div className="font-medium">Due:</div>
                          <div className="text-muted-foreground">{assignment.dueDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={assignment.progress} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{assignment.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Materials */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Materials</CardTitle>
                <CardDescription>Latest learning resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMaterials.map((material, index) => (
                  <div key={index} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="p-2 bg-secondary rounded h-fit">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{material.title}</p>
                      <p className="text-xs text-muted-foreground">{material.subject}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{material.date}</span>
                        <span className="px-1.5 py-0.5 bg-secondary text-xs rounded">{material.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm" size="sm">
                  <span>View All Materials</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Calendar Card */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Important upcoming dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-secondary p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="bg-red-100 text-red-700 p-1 rounded">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <span className="font-medium">May 15</span>
                    </div>
                    <p className="text-sm mt-1">Physics Midterm Exam</p>
                  </div>
                  <div className="bg-secondary p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 text-blue-700 p-1 rounded">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <span className="font-medium">May 20</span>
                    </div>
                    <p className="text-sm mt-1">English Essay Deadline</p>
                  </div>
                  <div className="bg-secondary p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 text-green-700 p-1 rounded">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <span className="font-medium">May 25</span>
                    </div>
                    <p className="text-sm mt-1">Math Final Exam</p>
                  </div>
                  <Button variant="outline" className="w-full text-sm" size="sm">
                    View Full Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
