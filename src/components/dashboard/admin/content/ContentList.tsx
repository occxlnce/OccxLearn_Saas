import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, FileDown, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ContentListProps {
  searchTerm?: string;
}

interface Content {
  id: string;
  title: string;
  subject: string;
  type: "video" | "image" | "document" | "other";
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
}

const ContentList = ({ searchTerm = '' }: ContentListProps) => {
  const [content, setContent] = useState<Content[]>([
    {
      id: '1',
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      type: 'document',
      uploadedBy: 'Mr. Thompson',
      uploadDate: '2023-08-15',
      fileSize: '1.2 MB'
    },
    {
      id: '2',
      title: 'Cell Biology Basics',
      subject: 'Biology',
      type: 'video',
      uploadedBy: 'Ms. Rodriguez',
      uploadDate: '2023-08-22',
      fileSize: '45 MB'
    },
    {
      id: '3',
      title: 'World War II Overview',
      subject: 'History',
      type: 'document',
      uploadedBy: 'Mr. Patel',
      uploadDate: '2023-09-01',
      fileSize: '2.5 MB'
    },
    {
      id: '4',
      title: 'Photosynthesis Diagram',
      subject: 'Biology',
      type: 'image',
      uploadedBy: 'Ms. Chen',
      uploadDate: '2023-09-05',
      fileSize: '0.8 MB'
    },
    {
      id: '5',
      title: 'Python Programming Basics',
      subject: 'Computer Science',
      type: 'document',
      uploadedBy: 'Dr. Gupta',
      uploadDate: '2023-09-10',
      fileSize: '1.5 MB'
    }
  ]);

  // Filter content based on search term
  const filteredContent = content.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteContent = (contentId: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setContent((prev) => prev.filter((item) => item.id !== contentId));
      toast.success('Content deleted successfully');
    }
  };

  const handleViewContent = (contentId: string) => {
    toast('View content with ID: ' + contentId);
  };

  const handleEditContent = (contentId: string) => {
    toast('Edit content with ID: ' + contentId);
  };

  const handleAddContent = () => {
    toast('Add new content clicked');
  };

  const handleDownloadContent = (contentId: string) => {
    toast('Download content with ID: ' + contentId);
  };

  const handleUploadContent = () => {
    toast('Upload content clicked');
  };

  const getTypeColor = (type: Content['type']) => {
    switch (type) {
      case 'video': return 'red';
      case 'image': return 'green';
      case 'document': return 'blue';
      default: return 'secondary';
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="bg-orange-500 hover:bg-orange-600 mr-2" onClick={handleUploadContent}>
          <Upload className="w-4 h-4 mr-2" />
          Upload New Content
        </Button>
        <Button className="bg-green-500 hover:bg-green-600" onClick={handleAddContent}>
          <FileDown className="w-4 h-4 mr-2" />
          Add From Link
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className={`h-8 text-${getTypeColor(item.type)}-500 border-${getTypeColor(item.type)}-200 hover:bg-${getTypeColor(item.type)}-50 hover:text-${getTypeColor(item.type)}-600`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Button>
                  </TableCell>
                  <TableCell>{item.uploadedBy}</TableCell>
                  <TableCell>{item.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewContent(item.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditContent(item.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDeleteContent(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleDownloadContent(item.id)}>
                        <FileDown className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {searchTerm ? 'No content found matching your search.' : 'No content available.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ContentList;
