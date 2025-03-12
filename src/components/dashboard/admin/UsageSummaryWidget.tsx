
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface UsageSummaryData {
  activeUsers: {
    count: number;
    total: number;
    percentage: number;
  };
  documentsUploaded: {
    count: number;
    total: number;
    percentage: number;
  };
  storageUsed: {
    count: number;
    total: number;
    percentage: number;
    unit: string;
  };
}

const UsageSummaryWidget = () => {
  const { data: usageData, isLoading, error } = useQuery({
    queryKey: ['usageSummary'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-dashboard-stats');
      
      if (error) {
        throw error;
      }
      
      return data.usageSummary as UsageSummaryData;
    }
  });

  if (isLoading) {
    return (
      <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Usage Summary</CardTitle>
            <BarChart3 className="h-5 w-5 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-2 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error('Error fetching usage summary:', error);
  }

  // Default values if data is not available
  const defaultData = {
    activeUsers: { count: 0, total: 0, percentage: 0 },
    documentsUploaded: { count: 0, total: 1000, percentage: 0 },
    storageUsed: { count: 0, total: 50, percentage: 0, unit: 'GB' },
  };

  const usage = usageData || defaultData;

  return (
    <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Usage Summary</CardTitle>
          <BarChart3 className="h-5 w-5 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <span className="text-sm font-medium">{usage.activeUsers.count}/{usage.activeUsers.total}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full" 
                style={{ width: `${usage.activeUsers.percentage}%` }} 
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Documents Uploaded</span>
              <span className="text-sm font-medium">{usage.documentsUploaded.count}/{usage.documentsUploaded.total}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full" 
                style={{ width: `${usage.documentsUploaded.percentage}%` }} 
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Storage Used</span>
              <span className="text-sm font-medium">{usage.storageUsed.count}/{usage.storageUsed.total} {usage.storageUsed.unit}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full" 
                style={{ width: `${usage.storageUsed.percentage}%` }} 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageSummaryWidget;
