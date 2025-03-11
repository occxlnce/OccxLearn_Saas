
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher" pageTitle="Teacher Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Classes Today</h2>
          <div className="space-y-3">
            <div className="p-3 bg-secondary rounded-md">
              <div className="flex justify-between mb-1">
                <span className="font-medium">Mathematics 101</span>
                <span className="text-orange-500">9:00 AM</span>
              </div>
              <span className="text-sm text-muted-foreground">Room 204</span>
            </div>
            <div className="p-3 bg-secondary rounded-md">
              <div className="flex justify-between mb-1">
                <span className="font-medium">Physics Advanced</span>
                <span className="text-orange-500">11:30 AM</span>
              </div>
              <span className="text-sm text-muted-foreground">Room 110</span>
            </div>
            <div className="p-3 bg-secondary rounded-md">
              <div className="flex justify-between mb-1">
                <span className="font-medium">Computer Science</span>
                <span className="text-orange-500">2:15 PM</span>
              </div>
              <span className="text-sm text-muted-foreground">Lab 3</span>
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Assignments Due</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Physics Quiz</p>
                <p className="text-sm text-muted-foreground">Due tomorrow</p>
              </div>
              <span className="text-yellow-500 text-sm font-medium">18 submitted</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Mathematics Homework</p>
                <p className="text-sm text-muted-foreground">Due in 3 days</p>
              </div>
              <span className="text-green-500 text-sm font-medium">24 submitted</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">CS Project</p>
                <p className="text-sm text-muted-foreground">Due next week</p>
              </div>
              <span className="text-red-500 text-sm font-medium">5 submitted</span>
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">10:23 AM</p>
              </div>
              <p className="text-sm text-muted-foreground truncate">Question about tomorrow's quiz...</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-medium">Principal Williams</p>
                <p className="text-sm text-muted-foreground">Yesterday</p>
              </div>
              <p className="text-sm text-muted-foreground truncate">Staff meeting rescheduled to...</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-medium">Mark Stevens</p>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
              <p className="text-sm text-muted-foreground truncate">Request for extension on project...</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
