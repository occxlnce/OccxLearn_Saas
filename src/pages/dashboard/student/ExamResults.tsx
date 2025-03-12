
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Filter } from 'lucide-react';

// Sample data for exam results
const examResults = [
  { id: '1', subject: 'Mathematics', examType: 'Quiz', date: '2023-10-15', score: 92, totalScore: 100, grade: 'A' },
  { id: '2', subject: 'Physics', examType: 'Lab Report', date: '2023-10-10', score: 85, totalScore: 100, grade: 'B' },
  { id: '3', subject: 'Computer Science', examType: 'Midterm', date: '2023-10-05', score: 96, totalScore: 100, grade: 'A+' },
  { id: '4', subject: 'Biology', examType: 'Final', date: '2023-09-30', score: 88, totalScore: 100, grade: 'B+' },
  { id: '5', subject: 'Chemistry', examType: 'Lab Report', date: '2023-09-25', score: 90, totalScore: 100, grade: 'A-' },
  { id: '6', subject: 'Mathematics', examType: 'Midterm', date: '2023-09-20', score: 89, totalScore: 100, grade: 'B+' },
  { id: '7', subject: 'Physics', examType: 'Quiz', date: '2023-09-15', score: 82, totalScore: 100, grade: 'B' },
];

// Data for the chart
const chartData = [
  { name: 'Sep 15', Physics: 82 },
  { name: 'Sep 20', Mathematics: 89 },
  { name: 'Sep 25', Chemistry: 90 },
  { name: 'Sep 30', Biology: 88 },
  { name: 'Oct 05', 'Computer Science': 96 },
  { name: 'Oct 10', Physics: 85 },
  { name: 'Oct 15', Mathematics: 92 },
];

const ExamResults = () => {
  const [examTypeFilter, setExamTypeFilter] = useState('all');
  const subjects = [...new Set(examResults.map(result => result.subject))];
  const examTypes = [...new Set(examResults.map(result => result.examType))];
  
  const getGradeColor = (grade: string) => {
    const firstChar = grade.charAt(0);
    if (firstChar === 'A') return 'text-green-500';
    if (firstChar === 'B') return 'text-blue-500';
    if (firstChar === 'C') return 'text-yellow-500';
    if (firstChar === 'D') return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreText = (result: typeof examResults[0]) => {
    return `${result.score}/${result.totalScore}`;
  };

  return (
    <DashboardLayout role="student" pageTitle="Exam Results">
      <div className="grid gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Your exam performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="Mathematics" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="Physics" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="Computer Science" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  <Area type="monotone" dataKey="Biology" stackId="1" stroke="#ff8042" fill="#ff8042" />
                  <Area type="monotone" dataKey="Chemistry" stackId="1" stroke="#0088FE" fill="#0088FE" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Exam Results Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <CardTitle>Exam Results</CardTitle>
                <CardDescription>View your grades for all assessments</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={examTypeFilter}
                  onValueChange={setExamTypeFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Exam Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exam Types</SelectItem>
                    {examTypes.map(type => (
                      <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="all">All Subjects</TabsTrigger>
                {subjects.map(subject => (
                  <TabsTrigger key={subject} value={subject}>{subject}</TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examResults
                      .filter(result => examTypeFilter === 'all' || result.examType.toLowerCase() === examTypeFilter)
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map(result => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.subject}</TableCell>
                          <TableCell>{result.examType}</TableCell>
                          <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                          <TableCell>{getScoreText(result)}</TableCell>
                          <TableCell className={`font-bold ${getGradeColor(result.grade)}`}>{result.grade}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              {subjects.map(subject => (
                <TabsContent key={subject} value={subject}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assessment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {examResults
                        .filter(result => result.subject === subject)
                        .filter(result => examTypeFilter === 'all' || result.examType.toLowerCase() === examTypeFilter)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map(result => (
                          <TableRow key={result.id}>
                            <TableCell>{result.examType}</TableCell>
                            <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                            <TableCell>{getScoreText(result)}</TableCell>
                            <TableCell className={`font-bold ${getGradeColor(result.grade)}`}>{result.grade}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ExamResults;
