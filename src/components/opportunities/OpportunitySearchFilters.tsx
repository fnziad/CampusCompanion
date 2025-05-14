
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Briefcase, X } from "lucide-react";

interface OpportunitySearchFiltersProps {
  onSearch: (query: string) => void;
  onTypeFilter: (type: string) => void;
  onFieldFilter: (field: string) => void;
  onLocationFilter: (location: string) => void;
  fields: string[];
}

export default function OpportunitySearchFilters({ 
  onSearch, 
  onTypeFilter, 
  onFieldFilter,
  onLocationFilter,
  fields
}: OpportunitySearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };
  
  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };
  
  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    onTypeFilter(type);
  };

  const handleFieldChange = (value: string) => {
    setSelectedField(value);
    onFieldFilter(value);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    onLocationFilter(value);
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search opportunities..."
          className="pl-8 pr-10"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-9 px-2"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedType === "" ? "default" : "outline"}
          size="sm"
          onClick={() => handleTypeClick("")}
          className="flex items-center gap-1"
        >
          <Briefcase className="h-4 w-4" />
          All
        </Button>
        <Button 
          variant={selectedType === "internship" ? "default" : "outline"}
          size="sm" 
          onClick={() => handleTypeClick("internship")}
          className={selectedType === "internship" ? "bg-blue-600" : ""}
        >
          Internships
        </Button>
        <Button 
          variant={selectedType === "job" ? "default" : "outline"}
          size="sm"
          onClick={() => handleTypeClick("job")}
          className={selectedType === "job" ? "bg-green-600" : ""}
        >
          Jobs
        </Button>
        <Button 
          variant={selectedType === "research" ? "default" : "outline"}
          size="sm"
          onClick={() => handleTypeClick("research")}
          className={selectedType === "research" ? "bg-purple-600" : ""}
        >
          Research
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)}
          className="ml-auto"
        >
          {expanded ? "Less filters" : "More filters"}
        </Button>
      </div>
      
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 animate-fade-in">
          <Select value={selectedField} onValueChange={handleFieldChange}>
            <SelectTrigger>
              <SelectValue placeholder="Field of Study" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fields</SelectItem>
              {fields.map(field => (
                <SelectItem key={field} value={field}>{field}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLocation} onValueChange={handleLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Dhaka">Dhaka</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
