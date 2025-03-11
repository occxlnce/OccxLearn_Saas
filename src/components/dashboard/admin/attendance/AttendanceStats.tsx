
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PieChart, Users, Calendar } from 'lucide-react';

const AttendanceStats = () => {
  // In a real app, this data would come from Supabase
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Overall Attendance</CardTitle>
              <PieChart className="h-5 w-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center my-4">92%</div>
            <div className="text-sm text-muted-foreground text-center">School-wide average</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Today's Attendance</CardTitle>
              <Calendar className="h-5 w-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center my-4">95%</div>
            <div className="text-sm text-muted-foreground text-center">210 present, 11 absent</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Most Absences</CardTitle>
              <Users className="h-5 w-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center my-4">Grade 11C</div>
            <div className="text-sm text-muted-foreground text-center">12% absence rate</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-orange-500/20 hover:border-orange-500/50 transition-colors">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Perfect Attendance</CardTitle>
              <BarChart3 className="h-5 w-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center my-4">128</div>
            <div className="text-sm text-muted-foreground text-center">Students with 100% attendance</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-sm border-orange-500/20">
        <CardHeader>
          <CardTitle>Monthly Attendance Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-muted-foreground">Chart will be displayed here showing attendance trends over time</div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-orange-500/20">
          <CardHeader>
            <CardTitle>Attendance by Class</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <div className="text-muted-foreground">Chart will be displayed here showing attendance by class</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-orange-500/20">
          <CardHeader>
            <CardTitle>Absence Reasons</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <div className="text-muted-foreground">Chart will be displayed here showing reasons for absences</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceStats;
