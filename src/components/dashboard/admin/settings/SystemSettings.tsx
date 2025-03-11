
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Manage global system settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="automatic-backup">Automatic Backups</Label>
                <p className="text-sm text-muted-foreground">Schedule automatic database backups</p>
              </div>
              <Switch id="automatic-backup" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="backup-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Put the system in maintenance mode</p>
              </div>
              <Switch id="maintenance-mode" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="user-registration">Allow User Registration</Label>
                <p className="text-sm text-muted-foreground">Let users register themselves</p>
              </div>
              <Switch id="user-registration" defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-orange-500 hover:bg-orange-600">Save System Settings</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Email Configuration</CardTitle>
          <CardDescription>Configure email notification settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send system notifications via email</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-template">Email Template</Label>
              <Select defaultValue="default">
                <SelectTrigger id="email-template">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Template</SelectItem>
                  <SelectItem value="modern">Modern Template</SelectItem>
                  <SelectItem value="minimal">Minimal Template</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-orange-500 hover:bg-orange-600">Save Email Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SystemSettings;
