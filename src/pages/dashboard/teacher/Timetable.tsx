
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Info, Users } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

type TimeSlot = {
  time: string;
  monday?: ClassInfo;
  tuesday?: ClassInfo;
  wednesday?: ClassInfo;
  thursday?: ClassInfo;
  friday?: ClassInfo;
};

type ClassInfo = {
  subject: string;
  class: string;
  room: string;
};

// Sample data for timetable
const timeSlots: TimeSlot[] = [
  {
    time: '8:00 - 9:00',
    monday: { subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101' },
    wednesday: { subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101' },
    friday: { subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101' }
  },
  {
    time: '9:15 - 10:15',
    tuesday: { subject: 'Mathematics', class: 'Grade 9B', room: 'Room 102' },
    thursday: { subject: 'Mathematics', class: 'Grade 9B', room: 'Room 102' }
  },
  {
    time: '10:30 - 11:30',
    monday: { subject: 'Mathematics', class: 'Grade 11C', room: 'Room 204' },
    wednesday: { subject: 'Mathematics', class: 'Grade 11C', room: 'Room 204' }
  },
  {
    time: '11:45 - 12:45',
    tuesday: { subject: 'Mathematics', class: 'Grade 12D', room: 'Room 205' },
    thursday: { subject: 'Mathematics', class: 'Grade 12D', room: 'Room 205' }
  },
  {
    time: '1:30 - 2:30',
    monday: { subject: 'Physics', class: 'Grade 11B', room: 'Lab 1' },
    wednesday: { subject: 'Physics', class: 'Grade 11B', room: 'Lab 1' },
    friday: { subject: 'Physics', class: 'Grade 11B', room: 'Lab 1' }
  },
  {
    time: '2:45 - 3:45',
    tuesday: { subject: 'Computer Science', class: 'Grade 12C', room: 'Lab 3' },
    thursday: { subject: 'Computer Science', class: 'Grade 12C', room: 'Lab 3' },
    friday: { subject: 'Computer Science', class: 'Grade 12C', room: 'Lab 3' }
  }
];

const weeks = [
  'Current Week (Aug 21 - Aug 27)',
  'Week 2 (Aug 28 - Sep 3)',
  'Week 3 (Sep 4 - Sep 10)'
];

const Timetable = () => {
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);

  return (
    <DashboardLayout role="teacher" pageTitle="Timetable">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>View and manage your teaching timetable</CardDescription>
            </div>
            <div className="w-full sm:w-64">
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger>
                  <SelectValue placeholder="Select week" />
                </SelectTrigger>
                <SelectContent>
                  {weeks.map(week => (
                    <SelectItem key={week} value={week}>
                      {week}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Time</TableHead>
                  <TableHead>Monday</TableHead>
                  <TableHead>Tuesday</TableHead>
                  <TableHead>Wednesday</TableHead>
                  <TableHead>Thursday</TableHead>
                  <TableHead>Friday</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((slot, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-sm">
                      {slot.time}
                    </TableCell>
                    <TableCell>
                      {slot.monday ? (
                        <ClassCell classInfo={slot.monday} />
                      ) : (
                        <EmptyCell />
                      )}
                    </TableCell>
                    <TableCell>
                      {slot.tuesday ? (
                        <ClassCell classInfo={slot.tuesday} />
                      ) : (
                        <EmptyCell />
                      )}
                    </TableCell>
                    <TableCell>
                      {slot.wednesday ? (
                        <ClassCell classInfo={slot.wednesday} />
                      ) : (
                        <EmptyCell />
                      )}
                    </TableCell>
                    <TableCell>
                      {slot.thursday ? (
                        <ClassCell classInfo={slot.thursday} />
                      ) : (
                        <EmptyCell />
                      )}
                    </TableCell>
                    <TableCell>
                      {slot.friday ? (
                        <ClassCell classInfo={slot.friday} />
                      ) : (
                        <EmptyCell />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

const ClassCell = ({ classInfo }: { classInfo: ClassInfo }) => (
  <div className="p-2 rounded-md bg-orange-500/10 border border-orange-500/20">
    <p className="font-medium text-orange-500">{classInfo.subject}</p>
    <div className="flex items-center text-xs mt-1 text-muted-foreground">
      <Users className="h-3 w-3 mr-1" />
      <span>{classInfo.class}</span>
    </div>
    <div className="flex items-center text-xs mt-1 text-muted-foreground">
      <Info className="h-3 w-3 mr-1" />
      <span>{classInfo.room}</span>
    </div>
  </div>
);

const EmptyCell = () => (
  <div className="text-center p-2 text-muted-foreground text-sm">
    Free
  </div>
);

export default Timetable;
