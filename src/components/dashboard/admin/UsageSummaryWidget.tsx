
import React from 'react';
import { BarChart3, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UsageSummaryWidget = () => {
  // In a real app, this data would come from an API call to Supabase
  const usageData = {
    activeUsers: { count: 178, total: 245, percentage: 73 },
    documentsUploaded: { count: 432, total: 1000, percentage: 43 },
    storageUsed: { count: 12.4, total: 50, percentage: 25, unit: 'GB' },
  };

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
              <span className="text-sm font-medium">{usageData.activeUsers.count}/{usageData.activeUsers.total}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full" 
                style={{ width: `${usageData.activeUsers.percentage}%` }} 
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Documents Uploaded</span>
              <span className="text-sm font-medium">{usageData.documentsUploaded.count}/{usageData.documentsUploaded.total}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full" 
                style={{ width: `${usageData.documentsUploaded.percentage}%` }} 
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Storage Used</span>
              <span className="text-sm font-medium">{usageData.storageUsed.count}/{usageData.storageUsed.total} {usageData.storageUsed.unit}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full" 
                style={{ width: `${usageData.storageUsed.percentage}%` }} 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageSummaryWidget;
