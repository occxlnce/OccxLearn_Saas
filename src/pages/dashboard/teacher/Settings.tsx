
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const TeacherSettings = () => {
  return (
    <DashboardLayout role="teacher" pageTitle="Settings">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile photo</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-orange-500 text-3xl">JA</AvatarFallback>
                </Avatar>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full">Upload new photo</Button>
                  <Button variant="outline" size="sm" className="w-full text-red-500 hover:text-red-600">
                    Remove photo
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Jane" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Anderson" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jane.anderson@occxlearn.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="mathematics">
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="computer_science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
                    defaultValue="Mathematics teacher with 8 years of experience specializing in algebra and calculus."
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm" htmlFor="email-assignments">Assignment Submissions</Label>
                      <p className="text-xs text-muted-foreground">Receive notifications when students submit assignments</p>
                    </div>
                    <Switch id="email-assignments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm" htmlFor="email-messages">New Messages</Label>
                      <p className="text-xs text-muted-foreground">Receive notifications for new messages</p>
                    </div>
                    <Switch id="email-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm" htmlFor="email-schedule">Schedule Changes</Label>
                      <p className="text-xs text-muted-foreground">Receive notifications for timetable or schedule changes</p>
                    </div>
                    <Switch id="email-schedule" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm" htmlFor="app-assignments">Assignment Submissions</Label>
                      <p className="text-xs text-muted-foreground">Show notifications when students submit assignments</p>
                    </div>
                    <Switch id="app-assignments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm" htmlFor="app-messages">New Messages</Label>
                      <p className="text-xs text-muted-foreground">Show notifications for new messages</p>
                    </div>
                    <Switch id="app-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm" htmlFor="app-schedule">Schedule Changes</Label>
                      <p className="text-xs text-muted-foreground">Show notifications for timetable or schedule changes</p>
                    </div>
                    <Switch id="app-schedule" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">SMS Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm" htmlFor="sms-urgent">Urgent Messages</Label>
                      <p className="text-xs text-muted-foreground">Receive SMS for urgent messages from administration</p>
                    </div>
                    <Switch id="sms-urgent" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm" htmlFor="sms-emergency">Emergency Alerts</Label>
                      <p className="text-xs text-muted-foreground">Receive SMS for school emergency alerts</p>
                    </div>
                    <Switch id="sms-emergency" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Reset to Default</Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Change Password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm" htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Add an additional layer of security</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Login Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-secondary p-2 rounded-md">
                      <div>
                        <p className="text-xs font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Windows - Chrome</p>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-200">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center bg-secondary p-2 rounded-md">
                      <div>
                        <p className="text-xs font-medium">Mobile Device</p>
                        <p className="text-xs text-muted-foreground">iOS - Safari</p>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-200">Active</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Log Out All Other Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TeacherSettings;
