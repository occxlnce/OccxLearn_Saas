
import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityItem {
  id: string;
  time: string;
  description: string;
}

const RecentActivitiesWidget = () => {
  // In a real app, this data would come from an API call to Supabase
  const activities: ActivityItem[] = [
    { id: '1', time: '2 hours ago', description: 'New teacher account created' },
    { id: '2', time: '5 hours ago', description: 'System update completed' },
    { id: '3', time: 'Yesterday', description: '15 student accounts added' },
    { id: '4', time: '2 days ago', description: 'Syllabus for Grade 10 updated' },
  ];

  return (
    <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
          <Activity className="h-5 w-5 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
              <p className="text-sm text-muted-foreground mb-1">{activity.time}</p>
              <p className="font-medium">{activity.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesWidget;
