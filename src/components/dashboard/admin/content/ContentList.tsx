
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Download, FileText, Video, Image, File } from 'lucide-react';

interface ContentListProps {
  searchTerm?: string;
}

interface Content {
  id: string;
  title: string;
  subject: string;
  type: 'document' | 'video' | 'image' | 'other';
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
}

const ContentList = ({ searchTerm = '' }: ContentListProps) => {
  // In a real app, this data would come from Supabase
  const contentList: Content[] = [
    { id: '1', title: 'Mathematics Formulas Sheet', subject: 'Mathematics', type: 'document', uploadedBy: 'Dr. Jessica Miller', uploadDate: '2 days ago', fileSize: '1.2 MB' },
    { id: '2', title: 'English Literature Analysis', subject: 'English', type: 'document', uploadedBy: 'Prof. Robert Johnson', uploadDate: '1 week ago', fileSize: '3.5 MB' },
    { id: '3', title: 'Physics Lab Demonstration', subject: 'Physics', type: 'video', uploadedBy: 'Ms. Amanda Lee', uploadDate: '3 days ago', fileSize: '15.7 MB' },
    { id: '4', title: 'Historical Maps Collection', subject: 'History', type: 'image', uploadedBy: 'Mr. Kevin Clark', uploadDate: '1 month ago', fileSize: '5.3 MB' },
    { id: '5', title: 'Programming Tutorial', subject: 'Computer Science', type: 'document', uploadedBy: 'Dr. Thomas Brown', uploadDate: '2 weeks ago', fileSize: '2.8 MB' },
  ].filter(content => 
    searchTerm === '' || 
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: Content['type']) => {
    switch (type) {
      case 'document': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'video': return <Video className="h-4 w-4 text-red-500" />;
      case 'image': return <Image className="h-4 w-4 text-green-500" />;
      case 'other': return <File className="h-4 w-4 text-gray-500" />;
      default: return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contentList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                {searchTerm ? 'No content found matching your search.' : 'No content available.'}
              </TableCell>
            </TableRow>
          ) : (
            contentList.map((content) => (
              <TableRow key={content.id}>
                <TableCell className="font-medium">{content.title}</TableCell>
                <TableCell>{content.subject}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(content.type)}
                    <span className="capitalize">{content.type}</span>
                  </div>
                </TableCell>
                <TableCell>{content.uploadedBy}</TableCell>
                <TableCell>{content.uploadDate}</TableCell>
                <TableCell>{content.fileSize}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentList;
