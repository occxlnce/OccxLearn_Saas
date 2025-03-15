
import React from 'react';
import SearchBar from '@/components/dashboard/SearchBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SubjectsFiltersProps {
  onSearch: (term: string) => void;
  onDepartmentChange: (department: string) => void;
  departments: string[];
  departmentFilter: string;
}

const SubjectsFilters: React.FC<SubjectsFiltersProps> = ({
  onSearch,
  onDepartmentChange,
  departments,
  departmentFilter
}) => {
  return (
    <div className="flex w-full md:w-auto flex-col md:flex-row gap-2">
      <SearchBar 
        onSearch={onSearch} 
        placeholder="Search subjects..." 
        className="w-full md:w-64"
      />
      <Select 
        value={departmentFilter} 
        onValueChange={onDepartmentChange}
      >
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Filter by department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept === 'all' ? 'All Departments' : dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectsFilters;
