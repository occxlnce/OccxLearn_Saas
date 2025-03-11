
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EyeOff, Key, Shield } from 'lucide-react';

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-orange-500" />
            <CardTitle>Password Security</CardTitle>
          </div>
          <CardDescription>Manage your account password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-orange-500 hover:bg-orange-600">Update Password</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-500" />
            <CardTitle>Two-Factor Authentication</CardTitle>
          </div>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Protect your account with 2FA</p>
            </div>
            <Switch id="2fa" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Authentication</p>
              <p className="text-sm text-muted-foreground">Receive codes via SMS</p>
            </div>
            <Switch id="sms-auth" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">App Authentication</p>
              <p className="text-sm text-muted-foreground">Use an authentication app</p>
            </div>
            <Switch id="app-auth" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-orange-500 hover:bg-orange-600">Save Security Settings</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <EyeOff className="h-5 w-5 text-orange-500" />
            <CardTitle>Session Management</CardTitle>
          </div>
          <CardDescription>Manage your active sessions and security logs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout</Label>
            <Select defaultValue="30">
              <SelectTrigger id="session-timeout">
                <SelectValue placeholder="Select timeout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="0">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="w-full">View Active Sessions</Button>
          <Button variant="outline" className="w-full">View Security Logs</Button>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="destructive">Sign Out All Devices</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecuritySettings;
