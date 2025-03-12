
import React, { useEffect, useState } from 'react';
import { Users, UserCircle, GraduationCap, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface UserStats {
  totalUsers: number;
  teachers: number;
  students: number;
  admins: number;
}

const UserStatisticsWidget = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-dashboard-stats');
      
      if (error) {
        throw error;
      }
      
      return data.userCounts as UserStats;
    }
  });

  if (isLoading) {
    return (
      <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">User Statistics</CardTitle>
            <Users className="h-5 w-5 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error('Error fetching user statistics:', error);
  }

  const defaultStats = {
    totalUsers: 0,
    teachers: 0,
    students: 0,
    admins: 0
  };

  const displayStats = stats || defaultStats;

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
            <span className="font-semibold">{displayStats.totalUsers}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Teachers</span>
            </div>
            <span className="font-semibold">{displayStats.teachers}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Students</span>
            </div>
            <span className="font-semibold">{displayStats.students}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Admins</span>
            </div>
            <span className="font-semibold">{displayStats.admins}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStatisticsWidget;
