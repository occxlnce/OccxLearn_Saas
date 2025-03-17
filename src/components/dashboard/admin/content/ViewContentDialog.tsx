
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ExternalLink, FileText, Video, Image as ImageIcon, FileQuestion, FileOutput } from 'lucide-react';

interface ViewContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
}

interface ContentDetails {
  id: string;
  title: string;
  description: string | null;
  type: string;
  subject: string | null;
  grade: string | null;
  file_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  created_by_name?: string;
  subject_name?: string;
}

const ViewContentDialog: React.FC<ViewContentDialogProps> = ({ 
  open, 
  onOpenChange, 
  contentId 
}) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ContentDetails | null>(null);

  useEffect(() => {
    if (contentId && open) {
      fetchContentDetails();
    }
  }, [contentId, open]);

  const fetchContentDetails = async () => {
    if (!contentId) return;
    
    try {
      setLoading(true);
      
      // Check if user is authenticated
      const { data: authData } = await supabase.auth.getSession();
      if (!authData.session) {
        toast.error('You must be signed in to view content details');
        onOpenChange(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('id', contentId)
        .single();
      
      if (error) throw error;
      
      let contentWithDetails = { ...data } as ContentDetails;
      
      // Get creator name if available
      if (data.created_by) {
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', data.created_by)
          .single();
          
        if (!userError && userData) {
          contentWithDetails.created_by_name = 
            `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'Unknown';
        }
      }
      
      // Get subject name if available
      if (data.subject) {
        const { data: subjectData, error: subjectError } = await supabase
          .from('subjects')
          .select('name')
          .eq('id', data.subject)
          .single();
          
        if (!subjectError && subjectData) {
          contentWithDetails.subject_name = subjectData.name;
        }
      }
      
      setContent(contentWithDetails);
    } catch (error: any) {
      console.error('Error fetching content details:', error);
      toast.error(`Failed to load content details: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'video':
        return <Video className="h-6 w-6 text-purple-500" />;
      case 'image':
        return <ImageIcon className="h-6 w-6 text-green-500" />;
      case 'quiz':
        return <FileQuestion className="h-6 w-6 text-orange-500" />;
      case 'assignment':
        return <FileOutput className="h-6 w-6 text-red-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  const getContentTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      document: "bg-blue-100 text-blue-800",
      video: "bg-purple-100 text-purple-800",
      image: "bg-green-100 text-green-800",
      quiz: "bg-orange-100 text-orange-800",
      assignment: "bg-red-100 text-red-800"
    };
    
    return variants[type] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderPreview = () => {
    if (!content || !content.file_url) return null;
    
    const fileUrl = content.file_url;
    const fileType = content.type;
    
    if (fileType === 'image') {
      return (
        <div className="mt-4 border rounded-lg overflow-hidden">
          <img 
            src={fileUrl} 
            alt={content.title} 
            className="mx-auto max-h-[300px] object-contain"
          />
        </div>
      );
    } else if (fileType === 'video') {
      return (
        <div className="mt-4 border rounded-lg overflow-hidden">
          <video 
            src={fileUrl} 
            controls 
            className="w-full max-h-[300px]"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      return (
        <div className="mt-4">
          <Button 
            variant="outline" 
            onClick={() => window.open(fileUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View File
          </Button>
        </div>
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Content Details</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="py-6 text-center">Loading content details...</div>
        ) : content ? (
          <div className="py-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {getContentTypeIcon(content.type)}
                  {content.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge className={getContentTypeBadge(content.type)}>
                    {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                  </Badge>
                  {content.subject_name && (
                    <Badge variant="outline">{content.subject_name}</Badge>
                  )}
                  {content.grade && (
                    <Badge variant="outline">Grade {content.grade}</Badge>
                  )}
                </div>
              </div>
            </div>
            
            {content.description && (
              <div className="border-t pt-3">
                <h4 className="font-medium mb-1 text-sm text-gray-600">Description</h4>
                <p className="text-gray-700">{content.description}</p>
              </div>
            )}
            
            {renderPreview()}
            
            <div className="border-t pt-3 text-sm text-gray-500">
              <p>Added by: {content.created_by_name || 'Unknown'}</p>
              <p>Created: {formatDate(content.created_at)}</p>
              <p>Last updated: {formatDate(content.updated_at)}</p>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-red-500">
            Content not found or has been deleted.
          </div>
        )}
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewContentDialog;
