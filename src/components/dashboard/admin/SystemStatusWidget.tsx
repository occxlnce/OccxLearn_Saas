
import React from 'react';
import { Server, Database, HardDrive, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SystemStatusWidget = () => {
  // In a real app, this data would come from an API call to Supabase
  const status = {
    server: { status: 'Online', color: 'text-green-500' },
    database: { status: 'Operational', color: 'text-green-500' },
    storage: { usage: 42, color: 'text-amber-500' },
    lastBackup: { date: 'Today, 03:00 AM', color: 'text-blue-500' }
  };

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
            <span className={`font-semibold ${status.server.color}`}>{status.server.status}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Database</span>
            </div>
            <span className={`font-semibold ${status.database.color}`}>{status.database.status}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Storage</span>
            </div>
            <span className={`font-semibold ${status.storage.color}`}>{status.storage.usage}% Used</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500/70" />
              <span className="text-sm text-muted-foreground">Last Backup</span>
            </div>
            <span className="font-semibold">{status.lastBackup.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatusWidget;
