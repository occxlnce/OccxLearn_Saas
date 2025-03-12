
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, Clock } from 'lucide-react';

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher" pageTitle="Teacher Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Today's Classes */}
        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">
              <Calendar className="h-5 w-5 inline mr-2 text-orange-500" />
              Today's Classes
            </CardTitle>
            <Badge variant="outline" className="font-normal">
              {new Date().toLocaleDateString()}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Mathematics 101</span>
                  <span className="text-orange-500">9:00 AM</span>
                </div>
                <span className="text-sm text-muted-foreground">Room 204 • Grade 10A</span>
              </div>
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Physics Advanced</span>
                  <span className="text-orange-500">11:30 AM</span>
                </div>
                <span className="text-sm text-muted-foreground">Room 110 • Grade 11B</span>
              </div>
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Computer Science</span>
                  <span className="text-orange-500">2:15 PM</span>
                </div>
                <span className="text-sm text-muted-foreground">Lab 3 • Grade 12C</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Assignments */}
        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">
              <Clock className="h-5 w-5 inline mr-2 text-orange-500" />
              Assignments Due
            </CardTitle>
            <Badge variant="outline" className="font-normal">Pending</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Physics Quiz</p>
                  <p className="text-sm text-muted-foreground">Due tomorrow</p>
                </div>
                <Badge variant="secondary">18/25 submitted</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mathematics Homework</p>
                  <p className="text-sm text-muted-foreground">Due in 3 days</p>
                </div>
                <Badge variant="secondary">24/25 submitted</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">CS Project</p>
                  <p className="text-sm text-muted-foreground">Due next week</p>
                </div>
                <Badge variant="secondary">5/25 submitted</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Messages */}
        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">
              <MessageSquare className="h-5 w-5 inline mr-2 text-orange-500" />
              Recent Messages
            </CardTitle>
            <Badge variant="secondary">3 new</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between">
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">10:23 AM</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">Question about tomorrow's quiz...</p>
              </div>
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between">
                  <p className="font-medium">Principal Williams</p>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">Staff meeting rescheduled to...</p>
              </div>
              <div className="p-3 bg-secondary rounded-md">
                <div className="flex justify-between">
                  <p className="font-medium">Mark Stevens</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">Request for extension on project...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
