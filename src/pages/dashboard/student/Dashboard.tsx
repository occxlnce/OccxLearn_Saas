
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, FileText, Clock, ArrowRight } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student" pageTitle="Student Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Today's Schedule */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Today's Schedule</CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Mathematics</span>
                  <span className="text-orange-500">9:00 AM</span>
                </div>
                <span className="text-sm text-muted-foreground">Prof. Johnson • Room 204</span>
              </div>
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Physics</span>
                  <span className="text-orange-500">11:30 AM</span>
                </div>
                <span className="text-sm text-muted-foreground">Prof. Martinez • Room 110</span>
              </div>
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Computer Science</span>
                  <span className="text-orange-500">2:15 PM</span>
                </div>
                <span className="text-sm text-muted-foreground">Prof. Williams • Lab A</span>
              </div>
              <Link to="/student/timetable">
                <Button variant="ghost" size="sm" className="mt-2 w-full text-orange-500 hover:text-orange-600 hover:bg-orange-50/20">
                  <span>View Full Schedule</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Assignments Due */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Assignments Due</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Physics Quiz</p>
                  <p className="text-sm text-muted-foreground">Due tomorrow</p>
                </div>
                <Badge variant="danger">Not submitted</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mathematics Homework</p>
                  <p className="text-sm text-muted-foreground">Due in 3 days</p>
                </div>
                <Badge variant="success">Submitted</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">CS Project</p>
                  <p className="text-sm text-muted-foreground">Due next week</p>
                </div>
                <Badge variant="warning">In progress</Badge>
              </div>
              <Link to="/student/assignments">
                <Button variant="ghost" size="sm" className="mt-2 w-full text-orange-500 hover:text-orange-600 hover:bg-orange-50/20">
                  <span>View All Assignments</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Recent Grades</CardTitle>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mathematics Quiz</p>
                  <p className="text-sm text-muted-foreground">October 15, 2023</p>
                </div>
                <span className="font-bold text-green-500">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Physics Lab Report</p>
                  <p className="text-sm text-muted-foreground">October 10, 2023</p>
                </div>
                <span className="font-bold text-amber-500">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">CS Midterm</p>
                  <p className="text-sm text-muted-foreground">October 5, 2023</p>
                </div>
                <span className="font-bold text-green-500">96%</span>
              </div>
              <Link to="/student/results">
                <Button variant="ghost" size="sm" className="mt-2 w-full text-orange-500 hover:text-orange-600 hover:bg-orange-50/20">
                  <span>View All Grades</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Link to="/student/materials">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 border-orange-500/20 hover:border-orange-500">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <span>Learning Materials</span>
          </Button>
        </Link>
        <Link to="/student/results">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 border-orange-500/20 hover:border-orange-500">
            <FileText className="h-6 w-6 text-orange-500" />
            <span>Exam Results</span>
          </Button>
        </Link>
        <Link to="/student/timetable">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 border-orange-500/20 hover:border-orange-500">
            <Calendar className="h-6 w-6 text-orange-500" />
            <span>Timetable</span>
          </Button>
        </Link>
        <Link to="/student/attendance">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 border-orange-500/20 hover:border-orange-500">
            <Clock className="h-6 w-6 text-orange-500" />
            <span>Attendance</span>
          </Button>
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
