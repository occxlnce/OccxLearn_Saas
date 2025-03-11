
import React from 'react';
import { Users, UserCircle, GraduationCap, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserStatisticsWidget = () => {
  // In a real app, this data would come from an API call to Supabase
  const stats = {
    totalUsers: 245,
    teachers: 32,
    students: 210,
    admins: 3
  };

  return (
    <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">User Statistics</CardTitle>
          <Users className="h-5 w-5 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Total Users</span>
            </div>
            <span className="font-semibold">{stats.totalUsers}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Teachers</span>
            </div>
            <span className="font-semibold">{stats.teachers}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Students</span>
            </div>
            <span className="font-semibold">{stats.students}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Admins</span>
            </div>
            <span className="font-semibold">{stats.admins}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStatisticsWidget;
