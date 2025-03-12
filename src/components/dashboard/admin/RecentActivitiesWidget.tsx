
import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  action: string;
  timestamp: string;
  details?: {
    [key: string]: any;
  };
  profiles?: {
    first_name: string | null;
    last_name: string | null;
  };
}

const RecentActivitiesWidget = () => {
  const { data: activities, isLoading, error } = useQuery({
    queryKey: ['recentActivities'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-dashboard-stats');
      
      if (error) {
        throw error;
      }
      
      return data.recentActivities as ActivityItem[];
    }
  });

  if (isLoading) {
    return (
      <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
            <Activity className="h-5 w-5 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="border-b border-border/50 pb-3">
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="border-b border-border/50 pb-3">
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="border-b border-border/50 pb-3">
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error('Error fetching recent activities:', error);
  }

  // Default empty list if data is not available
  const displayActivities = activities || [];

  return (
    <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
          <Activity className="h-5 w-5 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent>
        {displayActivities.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No recent activities
          </div>
        ) : (
          <div className="space-y-4">
            {displayActivities.map((activity) => (
              <div key={activity.id} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <p className="text-sm text-muted-foreground mb-1">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
                <p className="font-medium">{activity.action}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesWidget;
