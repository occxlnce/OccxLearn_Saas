
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UploadCloud, FileText, Video, Image, File, Search, MoreHorizontal, Trash, Edit, Eye } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

// Sample materials data
const materials = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    type: 'document' as const,
    uploadedBy: 'You',
    date: '2023-10-01',
    fileSize: '2.3 MB',
    fileUrl: '#'
  },
  {
    id: '2',
    title: 'Physics Forces Lecture',
    subject: 'Physics',
    type: 'video' as const,
    uploadedBy: 'You',
    date: '2023-10-05',
    fileSize: '45 MB',
    fileUrl: '#'
  },
  {
    id: '3',
    title: 'Database Diagrams',
    subject: 'Computer Science',
    type: 'image' as const,
    uploadedBy: 'You',
    date: '2023-10-03',
    fileSize: '1.5 MB',
    fileUrl: '#'
  },
  {
    id: '4',
    title: 'Advanced Calculus Examples',
    subject: 'Mathematics',
    type: 'document' as const,
    uploadedBy: 'You',
    date: '2023-09-28',
    fileSize: '3.1 MB',
    fileUrl: '#'
  },
  {
    id: '5',
    title: 'Programming Concepts',
    subject: 'Computer Science',
    type: 'document' as const,
    uploadedBy: 'You',
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

const UploadNotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const subjects = ['All Subjects', 'Mathematics', 'Physics', 'Computer Science', 'Biology', 'Chemistry'];
  
  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <DashboardLayout role="teacher" pageTitle="Upload Notes">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Learning Materials</CardTitle>
              <CardDescription>Upload and manage course materials for your students</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <UploadCloud className="w-4 h-4 mr-2" />
                Upload New
              </Button>
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
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
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
                          <TableCell>{new Date(material.date).toLocaleDateString()}</TableCell>
                          <TableCell>{material.fileSize}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer text-red-600">
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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

export default UploadNotes;
