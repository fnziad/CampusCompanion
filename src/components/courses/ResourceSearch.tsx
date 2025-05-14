
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ResourceSearchProps {
  onSearch: (query: string) => void;
  onTypeFilter?: (type: string) => void;
  onSortChange?: (sort: 'date' | 'rating') => void;
}

export default function ResourceSearch({ onSearch, onTypeFilter, onSortChange }: ResourceSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search resources by title, course code, or instructor..."
          className="pl-8 pr-10"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-9 px-2"
            onClick={handleClear}
          >
            Clear
          </Button>
        )}
      </div>

      {(onTypeFilter || onSortChange) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {onTypeFilter && (
            <Select onValueChange={onTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="pdf">PDF Documents</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="presentation">Presentations</SelectItem>
                <SelectItem value="link">External Links</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          {onSortChange && (
            <Select onValueChange={(value) => onSortChange(value as 'date' | 'rating')}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Most Recent</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      )}
    </div>
  );
}
