
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SyllabusList from '@/components/dashboard/admin/syllabus/SyllabusList';

const SyllabusManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log(`Searching for syllabus: ${term}`);
  };

  return (
    <DashboardLayout role="admin" pageTitle="Syllabus Management">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-1/2">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search syllabus by subject, grade or keyword..." 
          />
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Syllabus
        </Button>
      </div>
      
      <SyllabusList searchTerm={searchTerm} />
    </DashboardLayout>
  );
};

export default SyllabusManagementPage;
