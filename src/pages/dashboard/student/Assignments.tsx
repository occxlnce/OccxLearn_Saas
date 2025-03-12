
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Upload, FileText, Filter, ArrowUpDown, Clock, Calendar } from 'lucide-react';

// Sample assignments data
const assignments = [
  {
    id: '1',
    title: 'Physics Quiz',
    subject: 'Physics',
    type: 'Quiz',
    dueDate: '2023-10-20',
    status: 'not_submitted',
    description: 'Complete the online quiz about Newton\'s Laws of Motion.',
    assignedBy: 'Prof. Martinez',
    maxScore: 50
  },
  {
    id: '2',
    title: 'Mathematics Homework',
    subject: 'Mathematics',
    type: 'Homework',
    dueDate: '2023-10-23',
    status: 'submitted',
    description: 'Solve problems 1-15 from Chapter 7 on Calculus.',
    assignedBy: 'Prof. Johnson',
    maxScore: 30,
    submittedOn: '2023-10-15'
  },
  {
    id: '3',
    title: 'CS Project',
    subject: 'Computer Science',
    type: 'Project',
    dueDate: '2023-10-30',
    status: 'in_progress',
    description: 'Develop a simple database application with CRUD operations.',
    assignedBy: 'Prof. Williams',
    maxScore: 100
  },
  {
    id: '4',
    title: 'Biology Lab Report',
    subject: 'Biology',
    type: 'Lab Report',
    dueDate: '2023-10-18',
    status: 'submitted',
    description: 'Write a detailed report on the cell structure experiment.',
    assignedBy: 'Prof. Garcia',
    maxScore: 50,
    submittedOn: '2023-10-16'
  },
  {
    id: '5',
    title: 'Chemistry Assignment',
    subject: 'Chemistry',
    type: 'Assignment',
    dueDate: '2023-10-25',
    status: 'not_submitted',
    description: 'Complete the worksheet on chemical bonding.',
    assignedBy: 'Prof. Chen',
    maxScore: 40
  },
  {
    id: '6',
    title: 'English Essay',
    subject: 'English Literature',
    type: 'Essay',
    dueDate: '2023-11-05',
    status: 'in_progress',
    description: 'Write a 1500-word analysis of "To Kill a Mockingbird".',
    assignedBy: 'Prof. Brown',
    maxScore: 100
  },
  {
    id: '7',
    title: 'History Research Paper',
    subject: 'History',
    type: 'Research Paper',
    dueDate: '2023-11-10',
    status: 'not_started',
    description: 'Research and write about a significant historical event of the 20th century.',
    assignedBy: 'Prof. Smith',
    maxScore: 150
  }
];

// Status mapping to badge variants
const getStatusBadge = (status: string) => {
  switch(status) {
    case 'submitted':
      return <Badge variant="success">Submitted</Badge>;
    case 'not_submitted':
      return <Badge variant="danger">Not submitted</Badge>;
    case 'in_progress':
      return <Badge variant="warning">In progress</Badge>;
    case 'not_started':
      return <Badge variant="secondary">Not started</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

// Calculate days remaining or overdue
const getDaysRemaining = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0) {
    return <span className="text-green-600">{diffDays} days remaining</span>;
  } else if (diffDays === 0) {
    return <span className="text-orange-500">Due today</span>;
  } else {
    return <span className="text-red-600">{Math.abs(diffDays)} days overdue</span>;
  }
};

const Assignments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Get all unique subjects
  const subjects = ['All Subjects', ...new Set(assignments.map(a => a.subject))];
  
  // Filter and sort assignments
  const filteredAssignments = assignments
    .filter(assignment => 
      (filterStatus === 'all' || assignment.status === filterStatus) &&
      (assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
       assignment.assignedBy.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'subject') {
        return a.subject.localeCompare(b.subject);
      }
      return 0;
    });

  return (
    <DashboardLayout role="student" pageTitle="Assignments">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>View and manage your coursework assignments</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assignments..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="not_submitted">Not Submitted</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="not_started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="subject">Subject</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="All Subjects">
            <TabsList className="mb-4 overflow-x-auto flex flex-nowrap">
              {subjects.map(subject => (
                <TabsTrigger key={subject} value={subject} className="whitespace-nowrap">
                  {subject}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {subjects.map(subject => (
              <TabsContent key={subject} value={subject}>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        {subject === 'All Subjects' && <TableHead>Subject</TableHead>}
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned By</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssignments
                        .filter(assignment => subject === 'All Subjects' || assignment.subject === subject)
                        .map(assignment => (
                          <TableRow key={assignment.id}>
                            <TableCell className="font-medium">{assignment.title}</TableCell>
                            {subject === 'All Subjects' && <TableCell>{assignment.subject}</TableCell>}
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{new Date(assignment.dueDate).toLocaleDateString()}</span>
                                <span className="text-xs mt-1">{getDaysRemaining(assignment.dueDate)}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                            <TableCell>{assignment.assignedBy}</TableCell>
                            <TableCell>
                              {assignment.status === 'submitted' ? (
                                <Button variant="outline" size="sm" className="flex items-center gap-1" disabled>
                                  <FileText className="h-4 w-4" />
                                  <span>Submitted</span>
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <Upload className="h-4 w-4" />
                                  <span>Submit</span>
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Assignment Calendar View */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Assignment Timeline</CardTitle>
          <CardDescription>A timeline view of upcoming and overdue assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overdue Assignments */}
            <div>
              <h3 className="text-lg font-medium flex items-center mb-4 text-red-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>Overdue</span>
              </h3>
              <div className="space-y-3">
                {filteredAssignments
                  .filter(a => new Date(a.dueDate) < new Date() && a.status !== 'submitted')
                  .map(assignment => (
                    <div key={assignment.id} className="flex p-3 border border-red-300 bg-red-50/20 rounded-md">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">{assignment.title}</h4>
                          <span className="text-red-600 text-sm">{getDaysRemaining(assignment.dueDate)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{assignment.subject}</span>
                          <span>•</span>
                          <span>{assignment.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-red-300 text-red-600 hover:bg-red-100">
                          <Upload className="h-4 w-4" />
                          <span>Submit Now</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                {filteredAssignments.filter(a => new Date(a.dueDate) < new Date() && a.status !== 'submitted').length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No overdue assignments. Great job!
                  </div>
                )}
              </div>
            </div>
            
            {/* Due Today */}
            <div>
              <h3 className="text-lg font-medium flex items-center mb-4 text-orange-500">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Due Today</span>
              </h3>
              <div className="space-y-3">
                {filteredAssignments
                  .filter(a => {
                    const dueDate = new Date(a.dueDate);
                    const today = new Date();
                    return dueDate.getDate() === today.getDate() && 
                           dueDate.getMonth() === today.getMonth() && 
                           dueDate.getFullYear() === today.getFullYear() &&
                           a.status !== 'submitted';
                  })
                  .map(assignment => (
                    <div key={assignment.id} className="flex p-3 border border-orange-300 bg-orange-50/20 rounded-md">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">{assignment.title}</h4>
                          <span className="text-orange-500 text-sm">Due today</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{assignment.subject}</span>
                          <span>•</span>
                          <span>{assignment.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-orange-300 text-orange-500 hover:bg-orange-100">
                          <Upload className="h-4 w-4" />
                          <span>Submit</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                {filteredAssignments.filter(a => {
                  const dueDate = new Date(a.dueDate);
                  const today = new Date();
                  return dueDate.getDate() === today.getDate() && 
                         dueDate.getMonth() === today.getMonth() && 
                         dueDate.getFullYear() === today.getFullYear() &&
                         a.status !== 'submitted';
                }).length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    Nothing due today.
                  </div>
                )}
              </div>
            </div>
            
            {/* Upcoming */}
            <div>
              <h3 className="text-lg font-medium flex items-center mb-4 text-green-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Upcoming</span>
              </h3>
              <div className="space-y-3">
                {filteredAssignments
                  .filter(a => {
                    const dueDate = new Date(a.dueDate);
                    const today = new Date();
                    return dueDate > today && a.status !== 'submitted';
                  })
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .slice(0, 5)
                  .map(assignment => (
                    <div key={assignment.id} className="flex p-3 border border-green-300 bg-green-50/20 rounded-md">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">{assignment.title}</h4>
                          <span className="text-green-600 text-sm">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{assignment.subject}</span>
                          <span>•</span>
                          <span>{assignment.type}</span>
                          <span>•</span>
                          <span>{getDaysRemaining(assignment.dueDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        {assignment.status === 'in_progress' ? (
                          <Button variant="outline" size="sm" className="flex items-center gap-1 border-green-300 text-green-600 hover:bg-green-100">
                            <Upload className="h-4 w-4" />
                            <span>Continue</span>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="flex items-center gap-1 border-green-300 text-green-600 hover:bg-green-100">
                            <FileText className="h-4 w-4" />
                            <span>Start</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                {filteredAssignments.filter(a => {
                  const dueDate = new Date(a.dueDate);
                  const today = new Date();
                  return dueDate > today && a.status !== 'submitted';
                }).length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No upcoming assignments.
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Assignments;
