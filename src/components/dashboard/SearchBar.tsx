
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = 'Search...' }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-10 pr-16 py-2 w-full bg-white dark:bg-black/20 border-orange-500/20 focus-within:border-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Button 
          type="submit" 
          variant="ghost" 
          className="absolute right-0 text-orange-500 hover:text-orange-600 hover:bg-transparent"
        >
          Search
        </Button>
      </div>
    </form>
  );
};
