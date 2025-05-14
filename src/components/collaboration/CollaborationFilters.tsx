
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CollaborationFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  onSearch: () => void;
}

export function CollaborationFilters({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  onSearch,
}: CollaborationFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Collaborations</CardTitle>
        <CardDescription>Search for opportunities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Keywords</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by title, skills..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearch();
                }
              }}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Collaboration Type</Label>
          <Tabs 
            value={typeFilter || "all"} 
            onValueChange={(value) => {
              setTypeFilter(value);
              // Auto-apply filter when type changes
              setTimeout(() => onSearch(), 100);
            }}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Thesis Group">Thesis</TabsTrigger>
              <TabsTrigger value="Study Help">Study</TabsTrigger>
              <TabsTrigger value="Research Project">Research</TabsTrigger>
              <TabsTrigger value="Small Task">Tasks</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Button onClick={onSearch} className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
}
