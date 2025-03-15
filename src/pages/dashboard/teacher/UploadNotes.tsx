import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SearchBar from '@/components/dashboard/SearchBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

const UploadNotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch classes for dropdown
  const { data: classes } = useQuery({
    queryKey: ['teacher-classes'],
    queryFn: async () => {
      const userId = localStorage.getItem('userId');
      
      const { data, error } = await supabase
        .from('classes')
        .select('id, name')
        .eq('teacher_id', userId);
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch existing notes
  const { data: notes, isLoading, refetch } = useQuery({
    queryKey: ['teacher-notes', searchTerm],
    queryFn: async () => {
      const userId = localStorage.getItem('userId');
      
      let query = supabase
        .from('contents')
        .select(`
          id,
          title,
          description,
          created_at,
          file_url,
          classes:class_id(name)
        `)
        .eq('created_by', userId)
        .eq('type', 'notes');
      
      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!selectedClass) {
      toast.error('Please select a class');
      return;
    }
    
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const userId = localStorage.getItem('userId');
      const schoolId = localStorage.getItem('schoolId');
      
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `notes/${userId}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('content-files')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('content-files')
        .getPublicUrl(filePath);
      
      // Save note metadata to database
      const { error: dbError } = await supabase
        .from('contents')
        .insert({
          title,
          description,
          type: 'notes',
          file_url: urlData.publicUrl,
          class_id: selectedClass,
          school_id: schoolId,
          created_by: userId
        });
      
      if (dbError) throw dbError;
      
      toast.success('Notes uploaded successfully');
      
      // Reset form
      setTitle('');
      setDescription('');
      setSelectedClass('');
      setFile(null);
      
      // Refresh notes list
      refetch();
      
    } catch (error) {
      console.error('Error uploading notes:', error);
      toast.error('Failed to upload notes. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <DashboardLayout role="teacher" pageTitle="Upload Notes">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Upload Notes</h1>
          <SearchBar onSearch={handleSearch} placeholder="Search notes..." />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Notes</CardTitle>
                <CardDescription>
                  Upload notes for your students to access
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleUpload}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter description" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select 
                      value={selectedClass} 
                      onValueChange={setSelectedClass}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes?.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file">File</Label>
                    <Input 
                      id="file" 
                      type="file" 
                      accept=".pdf,.doc,.docx,.ppt,.pptx" 
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500">
                      Supported formats: PDF, DOC, DOCX, PPT, PPTX
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      'Uploading...'
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Notes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Notes</CardTitle>
                <CardDescription>
                  View and manage your uploaded notes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center py-8">Loading notes...</p>
                ) : notes && notes.length > 0 ? (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div 
                        key={note.id} 
                        className="border rounded-lg p-4 flex justify-between items-start"
                      >
                        <div>
                          <h3 className="font-medium">{note.title}</h3>
                          {note.description && (
                            <p className="text-sm text-gray-500 mt-1">{note.description}</p>
                          )}
                          <div className="flex items-center mt-2 space-x-4">
                            <span className="text-xs bg-secondary px-2 py-1 rounded">
                              {note.classes?.name || 'No class'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(note.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(note.file_url, '_blank')}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500">
                    {searchTerm 
                      ? 'No notes found matching your search.' 
                      : 'You haven\'t uploaded any notes yet.'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadNotes;
