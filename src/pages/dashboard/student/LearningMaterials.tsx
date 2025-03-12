
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DownloadCloud, FileText, Video, Image, File, Search } from 'lucide-react';

// Sample materials data
const materials = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    type: 'document',
    uploadedBy: 'Prof. Johnson',
    date: '2023-10-01',
    fileSize: '2.3 MB',
    fileUrl: '#'
  },
  {
    id: '2',
    title: 'Physics Forces Lecture',
    subject: 'Physics',
    type: 'video',
    uploadedBy: 'Prof. Martinez',
    date: '2023-10-05',
    fileSize: '45 MB',
    fileUrl: '#'
  },
  {
    id: '3',
    title: 'Database Diagrams',
    subject: 'Computer Science',
    type: 'image',
    uploadedBy: 'Prof. Williams',
    date: '2023-10-03',
    fileSize: '1.5 MB',
    fileUrl: '#'
  },
  {
    id: '4',
    title: 'Biology Cell Structure Notes',
    subject: 'Biology',
    type: 'document',
    uploadedBy: 'Prof. Garcia',
    date: '2023-09-28',
    fileSize: '3.1 MB',
    fileUrl: '#'
  },
  {
    id: '5',
    title: 'Chemistry Lab Instructions',
    subject: 'Chemistry',
    type: 'document',
    uploadedBy: 'Prof. Chen',
    date: '2023-10-07',
    fileSize: '1.8 MB',
    fileUrl: '#'
  }
];

// Icon mapping by file type
const getFileIcon = (type: string) => {
  switch(type) {
    case 'document':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'video':
      return <Video className="h-5 w-5 text-purple-500" />;
    case 'image':
      return <Image className="h-5 w-5 text-green-500" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

const LearningMaterials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const subjects = ['All Subjects', 'Mathematics', 'Physics', 'Computer Science', 'Biology', 'Chemistry'];
  
  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="student" pageTitle="Learning Materials">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Learning Materials</CardTitle>
              <CardDescription>Access and download course materials uploaded by your professors</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="All Subjects">
            <TabsList className="mb-4 w-full overflow-x-auto flex flex-nowrap">
              {subjects.map(subject => (
                <TabsTrigger key={subject} value={subject} className="whitespace-nowrap">
                  {subject}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {subjects.map(subject => (
              <TabsContent key={subject} value={subject}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials
                      .filter(material => subject === 'All Subjects' || material.subject === subject)
                      .map(material => (
                        <TableRow key={material.id}>
                          <TableCell className="flex items-center gap-2">
                            {getFileIcon(material.type)}
                            <span>{material.title}</span>
                          </TableCell>
                          <TableCell>{material.subject}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{material.uploadedBy}</TableCell>
                          <TableCell>{new Date(material.date).toLocaleDateString()}</TableCell>
                          <TableCell>{material.fileSize}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <DownloadCloud className="h-4 w-4" />
                              <span>Download</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default LearningMaterials;
