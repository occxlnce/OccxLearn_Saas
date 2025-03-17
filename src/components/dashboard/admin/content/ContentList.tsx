
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
import { Edit, Trash2, Eye, FileText, Video, Image as ImageIcon, FileQuestion, FileOutput } from 'lucide-react';
import { Content } from '@/pages/dashboard/admin/ContentManagement';

interface ContentListProps {
  contents: Content[];
  isLoading: boolean;
  onEdit: (content: Content) => void;
  onDelete: (content: Content) => void;
  onView: (content: Content) => void;
}

const ContentList: React.FC<ContentListProps> = ({ 
  contents, 
  isLoading, 
  onEdit,
  onDelete,
  onView
}) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-purple-500" />;
      case 'image':
        return <ImageIcon className="h-4 w-4 text-green-500" />;
      case 'quiz':
        return <FileQuestion className="h-4 w-4 text-orange-500" />;
      case 'assignment':
        return <FileOutput className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contents.length > 0 ? (
            contents.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  {getFileIcon(item.type)}
                  <span className="truncate max-w-[280px]">{item.title}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{item.grade || '-'}</TableCell>
                <TableCell>{formatDate(item.updated_at)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => onView(item)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => onEdit(item)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => onDelete(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No content available. Click "Add Content" to upload new content.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentList;
