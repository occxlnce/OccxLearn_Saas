import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Upload, UserCircle, Bell, Shield } from 'lucide-react';

const Settings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailAssignments: true,
    emailGrades: true,
    inAppAssignments: true,
    inAppGrades: true,
    inAppAttendance: true,
    emailAttendance: false,
  });

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <DashboardLayout role="student" pageTitle="Settings">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div>
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" alt="Student Name" />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload New Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">Recommended size: 300x300px. Max size: 2MB.</p>
                </div>
              </div>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john.doe@student.school.com" type="email" disabled />
                  <p className="text-xs text-muted-foreground">Email address cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" defaultValue="ST12345" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Year</Label>
                  <Input id="grade" defaultValue="Grade 10" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" rows={4} placeholder="Tell us a little about yourself" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how you receive notifications from the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Assignments</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive emails about new assignments and due dates</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailAssignments}
                        onCheckedChange={() => handleNotificationChange('emailAssignments')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">In-App Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive in-app alerts for new and upcoming assignments</p>
                      </div>
                      <Switch
                        checked={notificationSettings.inAppAssignments}
                        onCheckedChange={() => handleNotificationChange('inAppAssignments')}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Grades</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive emails when new grades are posted</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailGrades}
                        onCheckedChange={() => handleNotificationChange('emailGrades')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">In-App Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive in-app alerts for new grades</p>
                      </div>
                      <Switch
                        checked={notificationSettings.inAppGrades}
                        onCheckedChange={() => handleNotificationChange('inAppGrades')}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Attendance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive emails about attendance status changes</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailAttendance}
                        onCheckedChange={() => handleNotificationChange('emailAttendance')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">In-App Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive in-app alerts for attendance updates</p>
                      </div>
                      <Switch
                        checked={notificationSettings.inAppAttendance}
                        onCheckedChange={() => handleNotificationChange('inAppAttendance')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-orange-500 hover:bg-orange-600">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button className="mt-2 bg-orange-500 hover:bg-orange-600">Update Password</Button>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Login Sessions</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                        <p className="text-xs text-muted-foreground mt-1">Started: October 15, 2023 at 9:30 AM</p>
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600">
                  Sign Out All Other Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
