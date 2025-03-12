
import React from 'react';
import { Server, Database, HardDrive, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SystemStatusData {
  id: string;
  server_status: string;
  db_status: string;
  storage_used: number;
  storage_total: number;
  last_backup: string;
  updated_at: string;
}

const SystemStatusWidget = () => {
  const { data: systemStatus, isLoading, error } = useQuery({
    queryKey: ['systemStatus'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-dashboard-stats');
      
      if (error) {
        throw error;
      }
      
      return data.systemStatus as SystemStatusData;
    }
  });

  if (isLoading) {
    return (
      <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">System Status</CardTitle>
            <Server className="h-5 w-5 text-orange-500" />
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
    console.error('Error fetching system status:', error);
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'operational':
        return 'text-green-500';
      case 'degraded':
      case 'maintenance':
        return 'text-amber-500';
      case 'offline':
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStorageColor = (usage: number) => {
    if (usage < 60) return 'text-green-500';
    if (usage < 80) return 'text-amber-500';
    return 'text-red-500';
  };

  // Default values if data is not available
  const status = systemStatus || {
    server_status: 'Offline',
    db_status: 'Offline',
    storage_used: 0,
    storage_total: 50,
    last_backup: new Date().toISOString()
  };

  const storagePercentage = Math.round((status.storage_used / status.storage_total) * 100);
  const formattedBackupDate = status.last_backup ? 
    format(new Date(status.last_backup), 'MMM d, h:mm a') : 
    'Never';

  return (
    <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">System Status</CardTitle>
          <Server className="h-5 w-5 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Server Status</span>
            </div>
            <span className={`font-semibold ${getStatusColor(status.server_status)}`}>{status.server_status}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Database</span>
            </div>
            <span className={`font-semibold ${getStatusColor(status.db_status)}`}>{status.db_status}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Storage</span>
            </div>
            <span className={`font-semibold ${getStorageColor(storagePercentage)}`}>{storagePercentage}% Used</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Last Backup</span>
            </div>
            <span className="font-semibold">{formattedBackupDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatusWidget;
