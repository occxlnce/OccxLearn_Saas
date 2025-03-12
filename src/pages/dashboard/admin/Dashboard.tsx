
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UserStatisticsWidget from '@/components/dashboard/admin/UserStatisticsWidget';
import SystemStatusWidget from '@/components/dashboard/admin/SystemStatusWidget';
import RecentActivitiesWidget from '@/components/dashboard/admin/RecentActivitiesWidget';
import UsageSummaryWidget from '@/components/dashboard/admin/UsageSummaryWidget';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  // Subscribe to realtime changes for the activities table
  useEffect(() => {
    const channel = supabase
      .channel('public:activities')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'activities' }, 
        () => {
          // Invalidate the query to refresh the data
          queryClient.invalidateQueries({ queryKey: ['recentActivities'] });
          toast.info('New activity detected');
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleSearch = (term: string) => {
    if (!term) return;
    
    console.log('Searching for:', term);
    
    // Determine where to navigate based on search term
    if (term.toLowerCase().includes('user') || term.toLowerCase().includes('student') || term.toLowerCase().includes('teacher')) {
      navigate('/admin/users', { state: { searchTerm: term } });
    } else if (term.toLowerCase().includes('subject') || term.toLowerCase().includes('class')) {
      navigate('/admin/subjects', { state: { searchTerm: term } });
    } else if (term.toLowerCase().includes('content') || term.toLowerCase().includes('document')) {
      navigate('/admin/content', { state: { searchTerm: term } });
    } else if (term.toLowerCase().includes('syllabus')) {
      navigate('/admin/syllabus', { state: { searchTerm: term } });
    } else {
      // Default to content search if no specific keywords
      navigate('/admin/content', { state: { searchTerm: term } });
    }
  };

  // Prefetch data to make dashboard load faster
  useQuery({
    queryKey: ['adminDashboardData'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-dashboard-stats');
      if (error) throw error;
      return data;
    },
    staleTime: 60000, // 1 minute
  });

  return (
    <DashboardLayout role="admin" pageTitle="Admin Dashboard">
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Search users, subjects, or documents..." />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <UserStatisticsWidget />
        <SystemStatusWidget />
        <UsageSummaryWidget />
        <RecentActivitiesWidget />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
