
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, ClipboardCheck, FileText } from 'lucide-react';

const statCards = [
  {
    title: 'Total Students',
    value: '1,248',
    change: '+12%',
    icon: Users,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Total Teachers',
    value: '64',
    change: '+3%',
    icon: Users,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    title: 'Attendance Rate',
    value: '92.7%',
    change: '+0.8%',
    icon: ClipboardCheck,
    color: 'bg-green-100 text-green-700',
  },
  {
    title: 'Content Uploads',
    value: '328',
    change: '+24%',
    icon: FileText,
    color: 'bg-amber-100 text-amber-700',
  },
];

const recentActivities = [
  {
    user: 'Sarah Johnson',
    role: 'Teacher',
    action: 'Uploaded exam results',
    time: '15 minutes ago',
  },
  {
    user: 'Mark Wilson',
    role: 'Admin',
    action: 'Added new student accounts',
    time: '45 minutes ago',
  },
  {
    user: 'Emily Chen',
    role: 'Teacher',
    action: 'Updated syllabus for Mathematics',
    time: '2 hours ago',
  },
  {
    user: 'David Thompson',
    role: 'Admin',
    action: 'Generated attendance reports',
    time: '5 hours ago',
  },
  {
    user: 'Jessica Lee',
    role: 'Teacher',
    action: 'Uploaded new study materials',
    time: 'Yesterday, 3:45 PM',
  },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" pageTitle="Admin Dashboard">
      <div className="grid gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className={`p-2 rounded-full ${card.color}`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">{card.change}</span> from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions performed in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-full">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground mt-1">
                        {activity.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <button className="w-full flex items-center gap-3 bg-secondary p-3 rounded-md hover:bg-secondary/80 transition-colors">
                <Users className="h-5 w-5 text-primary" />
                <span>Add New User</span>
              </button>
              <button className="w-full flex items-center gap-3 bg-secondary p-3 rounded-md hover:bg-secondary/80 transition-colors">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Update Syllabus</span>
              </button>
              <button className="w-full flex items-center gap-3 bg-secondary p-3 rounded-md hover:bg-secondary/80 transition-colors">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                <span>View Attendance Report</span>
              </button>
              <button className="w-full flex items-center gap-3 bg-secondary p-3 rounded-md hover:bg-secondary/80 transition-colors">
                <FileText className="h-5 w-5 text-primary" />
                <span>Generate System Report</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
