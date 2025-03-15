
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Subject } from '@/components/dashboard/admin/subjects/SubjectListItem';

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  useEffect(() => {
    fetchSubjects();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('public:subjects')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'subjects' }, 
        () => {
          fetchSubjects(); // Refetch subjects when any change occurs
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchSubjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      
      // Transform the data to match the Subject type
      const typedSubjects: Subject[] = data?.map(item => ({
        ...item,
        status: (item.status === 'active' || item.status === 'inactive') 
          ? item.status as 'active' | 'inactive' 
          : 'inactive'
      })) || [];
      
      setSubjects(typedSubjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast.error('Failed to load subjects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleDepartmentFilter = (department: string) => {
    setDepartmentFilter(department);
  };

  // Extract unique departments for the filter
  const departments = ['all', ...new Set(subjects
    .filter(subject => subject.department)
    .map(subject => subject.department as string)
  )];

  // Apply filters
  const filteredSubjects = subjects
    .filter(subject => 
      (subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (subject.description && subject.description.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .filter(subject => 
      departmentFilter === 'all' || 
      (subject.department && subject.department.toLowerCase() === departmentFilter.toLowerCase())
    );

  return {
    subjects: filteredSubjects,
    isLoading,
    searchTerm,
    departmentFilter,
    departments,
    handleSearch,
    handleDepartmentFilter,
    fetchSubjects
  };
}
