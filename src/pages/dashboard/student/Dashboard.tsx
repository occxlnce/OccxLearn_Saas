
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student" pageTitle="Student Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="space-y-3">
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
              <span className="text-sm text-muted-foreground">Prof. Williams • Lab 3</span>
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
              <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-500">Not submitted</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Mathematics Homework</p>
                <p className="text-sm text-muted-foreground">Due in 3 days</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">Submitted</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">CS Project</p>
                <p className="text-sm text-muted-foreground">Due next week</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-500">In progress</span>
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Grades</h2>
          <div className="space-y-3">
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
              <span className="font-bold text-orange-500">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">CS Midterm</p>
                <p className="text-sm text-muted-foreground">October 5, 2023</p>
              </div>
              <span className="font-bold text-green-500">96%</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
