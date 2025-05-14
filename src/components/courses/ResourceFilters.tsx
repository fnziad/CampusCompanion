
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ResourceFiltersProps {
  onTypeFilter: (type: string) => void;
  onSortChange: (sort: 'date' | 'rating') => void;
}

export default function ResourceFilters({ onTypeFilter, onSortChange }: ResourceFiltersProps) {
  return (
    <div className="flex gap-4">
      <Select onValueChange={onTypeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pdf">PDF Documents</SelectItem>
          <SelectItem value="video">Videos</SelectItem>
          <SelectItem value="presentation">Presentations</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      
      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Most Recent</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
