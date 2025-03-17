
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SearchBar from '@/components/dashboard/SearchBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ContentList from '@/components/dashboard/admin/content/ContentList';
import AddContentDialog from '@/components/dashboard/admin/content/AddContentDialog';
import EditContentDialog from '@/components/dashboard/admin/content/EditContentDialog';
import ViewContentDialog from '@/components/dashboard/admin/content/ViewContentDialog';
import DeleteContentDialog from '@/components/dashboard/admin/content/DeleteContentDialog';

export interface Content {
  id: string;
  title: string;
  description?: string;
  type: string;
  subject?: string;
  grade?: string;
  file_url?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

const ContentManagement = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [contentType, setContentType] = useState('all');
  
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  useEffect(() => {
    fetchContents();

    // Subscribe to changes in the contents table
    const subscription = supabase
      .channel('contents-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'contents' }, 
        () => {
          fetchContents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  useEffect(() => {
    if (contents.length > 0) {
      applyFilters();
    }
  }, [searchTerm, contentType, contents]);

  const fetchContents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setContents(data || []);
      setFilteredContents(data || []);
    } catch (error) {
      console.error('Error fetching contents:', error);
      toast.error('Failed to load contents');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...contents];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(content => 
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (content.description && content.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (content.subject && content.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (content.grade && content.grade.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply content type filter
    if (contentType !== 'all') {
      filtered = filtered.filter(content => content.type === contentType);
    }
    
    setFilteredContents(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleEdit = (content: Content) => {
    setSelectedContent(content);
    setEditDialogOpen(true);
  };

  const handleView = (content: Content) => {
    setSelectedContent(content);
    setViewDialogOpen(true);
  };

  const handleDelete = (content: Content) => {
    setSelectedContent(content);
    setDeleteDialogOpen(true);
  };

  return (
    <DashboardLayout role="admin" pageTitle="Content Management">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Content Management</h1>
          <div className="flex items-center gap-4">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search content..." 
            />
            <Button onClick={() => setAddDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Content
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setContentType} className="flex-1 flex flex-col">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="quiz">Quizzes</TabsTrigger>
            <TabsTrigger value="assignment">Assignments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="flex-1">
            <ContentList 
              contents={filteredContents} 
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabsContent>
          
          <TabsContent value="document" className="flex-1">
            <ContentList 
              contents={filteredContents} 
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabsContent>
          
          <TabsContent value="video" className="flex-1">
            <ContentList 
              contents={filteredContents} 
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabsContent>
          
          <TabsContent value="image" className="flex-1">
            <ContentList 
              contents={filteredContents} 
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabsContent>
          
          <TabsContent value="quiz" className="flex-1">
            <ContentList 
              contents={filteredContents} 
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabsContent>
          
          <TabsContent value="assignment" className="flex-1">
            <ContentList 
              contents={filteredContents} 
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <AddContentDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSuccess={fetchContents}
      />

      {selectedContent && (
        <>
          <EditContentDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            content={selectedContent}
            onSuccess={fetchContents}
          />

          <DeleteContentDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            contentId={selectedContent.id}
            contentTitle={selectedContent.title}
            onSuccess={fetchContents}
          />

          <ViewContentDialog
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
            contentId={selectedContent.id}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default ContentManagement;
