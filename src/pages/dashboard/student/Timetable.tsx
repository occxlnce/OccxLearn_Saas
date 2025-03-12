
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar as CalendarIcon } from 'lucide-react';

// Sample timetable data
const timetableData = {
  monday: [
    { id: '1', subject: 'Mathematics', startTime: '09:00', endTime: '10:30', teacher: 'Prof. Johnson', room: '204' },
    { id: '2', subject: 'Physics', startTime: '11:00', endTime: '12:30', teacher: 'Prof. Martinez', room: '110' },
    { id: '3', subject: 'Lunch Break', startTime: '12:30', endTime: '13:30', teacher: '', room: 'Cafeteria' },
    { id: '4', subject: 'Computer Science', startTime: '14:00', endTime: '15:30', teacher: 'Prof. Williams', room: 'Lab A' },
  ],
  tuesday: [
    { id: '5', subject: 'Biology', startTime: '09:00', endTime: '10:30', teacher: 'Prof. Garcia', room: '305' },
    { id: '6', subject: 'Chemistry', startTime: '11:00', endTime: '12:30', teacher: 'Prof. Chen', room: 'Lab B' },
    { id: '7', subject: 'Lunch Break', startTime: '12:30', endTime: '13:30', teacher: '', room: 'Cafeteria' },
    { id: '8', subject: 'English Literature', startTime: '14:00', endTime: '15:30', teacher: 'Prof. Brown', room: '201' },
  ],
  wednesday: [
    { id: '9', subject: 'Mathematics', startTime: '09:00', endTime: '10:30', teacher: 'Prof. Johnson', room: '204' },
    { id: '10', subject: 'History', startTime: '11:00', endTime: '12:30', teacher: 'Prof. Smith', room: '302' },
    { id: '11', subject: 'Lunch Break', startTime: '12:30', endTime: '13:30', teacher: '', room: 'Cafeteria' },
    { id: '12', subject: 'Physical Education', startTime: '14:00', endTime: '15:30', teacher: 'Coach Davis', room: 'Gym' },
  ],
  thursday: [
    { id: '13', subject: 'Computer Science', startTime: '09:00', endTime: '10:30', teacher: 'Prof. Williams', room: 'Lab A' },
    { id: '14', subject: 'Chemistry', startTime: '11:00', endTime: '12:30', teacher: 'Prof. Chen', room: 'Lab B' },
    { id: '15', subject: 'Lunch Break', startTime: '12:30', endTime: '13:30', teacher: '', room: 'Cafeteria' },
    { id: '16', subject: 'Biology', startTime: '14:00', endTime: '15:30', teacher: 'Prof. Garcia', room: '305' },
  ],
  friday: [
    { id: '17', subject: 'Physics', startTime: '09:00', endTime: '10:30', teacher: 'Prof. Martinez', room: '110' },
    { id: '18', subject: 'English Literature', startTime: '11:00', endTime: '12:30', teacher: 'Prof. Brown', room: '201' },
    { id: '19', subject: 'Lunch Break', startTime: '12:30', endTime: '13:30', teacher: '', room: 'Cafeteria' },
    { id: '20', subject: 'Mathematics', startTime: '14:00', endTime: '15:30', teacher: 'Prof. Johnson', room: '204' },
  ],
  saturday: [],
  sunday: []
};

// Day of week array
const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Get today's name
const getTodayName = () => {
  const today = new Date().getDay();
  // Convert 0-6 (Sunday-Saturday) to our array indexes
  return daysOfWeek[today === 0 ? 6 : today - 1];
};

const Timetable = () => {
  const [currentDay, setCurrentDay] = useState(getTodayName());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  
  const handlePrevDay = () => {
    const currentIndex = daysOfWeek.indexOf(currentDay);
    const newIndex = currentIndex === 0 ? daysOfWeek.length - 1 : currentIndex - 1;
    setCurrentDay(daysOfWeek[newIndex]);
  };
  
  const handleNextDay = () => {
    const currentIndex = daysOfWeek.indexOf(currentDay);
    const newIndex = currentIndex === daysOfWeek.length - 1 ? 0 : currentIndex + 1;
    setCurrentDay(daysOfWeek[newIndex]);
  };
  
  const formatDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <DashboardLayout role="student" pageTitle="Timetable">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle>Class Schedule</CardTitle>
              <CardDescription>Your weekly timetable</CardDescription>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setViewMode('day')}
                className={viewMode === 'day' ? 'bg-orange-100/20 text-orange-500 border-orange-500' : ''}
              >
                Day View
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setViewMode('week')}
                className={viewMode === 'week' ? 'bg-orange-100/20 text-orange-500 border-orange-500' : ''}
              >
                Week View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'day' ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={handlePrevDay}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous Day
                </Button>
                <h3 className="text-lg font-medium">{formatDayName(currentDay)}</h3>
                <Button variant="ghost" size="sm" onClick={handleNextDay}>
                  Next Day
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {timetableData[currentDay as keyof typeof timetableData].length > 0 ? (
                  timetableData[currentDay as keyof typeof timetableData].map(session => (
                    <div 
                      key={session.id} 
                      className={`p-4 rounded-md border ${
                        session.subject === 'Lunch Break' 
                          ? 'bg-gray-100 border-gray-200' 
                          : 'bg-orange-50/20 border-orange-500/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{session.subject}</h4>
                        <div className="flex items-center text-sm text-orange-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {session.startTime} - {session.endTime}
                        </div>
                      </div>
                      {session.teacher && (
                        <p className="text-sm text-gray-500">{session.teacher}</p>
                      )}
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {session.room}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p>No classes scheduled for {formatDayName(currentDay)}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-center p-2 font-semibold">
                      {formatDayName(day)}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2 mt-4">
                  {daysOfWeek.map(day => (
                    <div key={day} className="min-h-[300px] border rounded-md p-2">
                      {timetableData[day as keyof typeof timetableData].length > 0 ? (
                        timetableData[day as keyof typeof timetableData].map(session => (
                          <div 
                            key={session.id} 
                            className={`p-2 mb-2 rounded-md text-xs ${
                              session.subject === 'Lunch Break' 
                                ? 'bg-gray-100 border-gray-200' 
                                : 'bg-orange-50/20 border border-orange-500/20'
                            }`}
                          >
                            <div className="font-medium">{session.subject}</div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {session.startTime} - {session.endTime}
                            </div>
                            {session.teacher && (
                              <div className="text-xs text-gray-500 mt-1">
                                {session.teacher}
                              </div>
                            )}
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {session.room}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-gray-400 text-xs h-full flex items-center justify-center">
                          No classes
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Timetable;
