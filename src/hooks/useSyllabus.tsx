
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface Syllabus {
  id: string;
  subject: string;
  grade: string;
  lastUpdated: string;
  status: "published" | "draft" | "archived";
  level?: "primary" | "secondary";
  description?: string;
}

export function useSyllabus() {
  const [syllabus, setSyllabus] = useState<Syllabus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  useEffect(() => {
    fetchSyllabus();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('public:syllabus')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'syllabus' }, 
        () => {
          fetchSyllabus(); // Refetch syllabus when any change occurs
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchSyllabus = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('syllabus')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match the Syllabus type
      const typedSyllabus: Syllabus[] = data?.map(item => ({
        id: item.id,
        subject: item.subject,
        grade: item.grade,
        lastUpdated: new Date(item.updated_at).toISOString().split('T')[0],
        status: (item.status === 'published' || item.status === 'draft' || item.status === 'archived') 
          ? item.status as 'published' | 'draft' | 'archived' 
          : 'draft',
        level: item.level as 'primary' | 'secondary',
        description: item.description
      })) || [];
      
      setSyllabus(typedSyllabus);
    } catch (error) {
      console.error('Error fetching syllabus:', error);
      toast.error('Failed to load syllabus');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleLevelFilter = (level: string) => {
    setLevelFilter(level);
  };

  // Apply filters
  const filteredSyllabus = syllabus
    .filter(item => 
      (item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .filter(item => 
      levelFilter === 'all' || 
      (item.level && item.level.toLowerCase() === levelFilter.toLowerCase())
    );

  return {
    syllabus: filteredSyllabus,
    isLoading,
    searchTerm,
    levelFilter,
    handleSearch,
    handleLevelFilter,
    fetchSyllabus
  };
}
