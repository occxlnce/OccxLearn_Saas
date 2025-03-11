
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';

const ProfileSettings = () => {
  // In a real app, this data would come from Supabase
  const adminProfile = {
    name: 'Admin User',
    email: 'admin@school.com',
    role: 'Administrator',
    bio: 'System administrator responsible for overall management of the school platform.',
    avatarUrl: null,
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information and profile picture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div>
              <Avatar className="h-24 w-24">
                <AvatarImage src={adminProfile.avatarUrl || ''} alt={adminProfile.name} />
                <AvatarFallback className="text-lg">{adminProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={adminProfile.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={adminProfile.email} type="email" disabled />
                <p className="text-xs text-muted-foreground">Email address cannot be changed</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue={adminProfile.role} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={4} defaultValue={adminProfile.bio} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control how you receive notifications from the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Notification preferences would go here */}
            <p className="text-muted-foreground">Notification preferences will be implemented here</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-orange-500 hover:bg-orange-600">Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSettings;
