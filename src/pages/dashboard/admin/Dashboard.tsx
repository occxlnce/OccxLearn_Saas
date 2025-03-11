
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" pageTitle="Admin Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Users</span>
              <span className="font-medium">245</span>
            </div>
            <div className="flex justify-between">
              <span>Teachers</span>
              <span className="font-medium">32</span>
            </div>
            <div className="flex justify-between">
              <span>Students</span>
              <span className="font-medium">210</span>
            </div>
            <div className="flex justify-between">
              <span>Admins</span>
              <span className="font-medium">3</span>
            </div>
          </div>
        </div>
        
        {/* Additional dashboard content */}
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Server Status</span>
              <span className="text-green-500 font-medium">Online</span>
            </div>
            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-green-500 font-medium">Operational</span>
            </div>
            <div className="flex justify-between">
              <span>Storage</span>
              <span className="font-medium">42% Used</span>
            </div>
            <div className="flex justify-between">
              <span>Last Backup</span>
              <span className="font-medium">Today, 03:00 AM</span>
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
              <p>New teacher account created</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">5 hours ago</p>
              <p>System update completed</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Yesterday</p>
              <p>15 student accounts added</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
