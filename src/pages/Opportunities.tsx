
import { useState, useEffect } from "react";
import { OpportunityController } from "@/controllers/OpportunityController";
import { Opportunity } from "@/types";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import OpportunitySearchFilters from "@/components/opportunities/OpportunitySearchFilters";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { PlusCircle, Loader2 } from "lucide-react";

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Get all unique fields from opportunities
  const fields = [...new Set(opportunities.map(opp => opp.field))];

  // Fetch initial opportunities
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await OpportunityController.getOpportunities();
        setOpportunities(data);
        setFilteredOpportunities(data);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter opportunities when search parameters change
  useEffect(() => {
    const applyFilters = async () => {
      try {
        setLoading(true);
        const filtered = await OpportunityController.getFilteredOpportunities(
          searchQuery,
          selectedType,
          selectedField,
          selectedLocation
        );
        setFilteredOpportunities(filtered);
      } catch (error) {
        console.error("Error filtering opportunities:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce filter requests
    const timer = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedType, selectedField, selectedLocation]);
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
  };
  
  const handleFieldFilter = (field: string) => {
    setSelectedField(field);
  };
  
  const handleLocationFilter = (location: string) => {
    setSelectedLocation(location);
  };

  const canCreateOpportunity = user?.role === 'SuperAdmin' || user?.role === 'Moderator';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 font-heading">Opportunities</h1>
          <p className="text-muted-foreground">
            Discover internships, jobs, and research positions
          </p>
        </div>
        
        {canCreateOpportunity && (
          <Link to="/opportunities/new">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Post Opportunity
            </Button>
          </Link>
        )}
      </div>
      
      <div className="mb-8">
        <OpportunitySearchFilters
          onSearch={handleSearchChange}
          onTypeFilter={handleTypeFilter}
          onFieldFilter={handleFieldFilter}
          onLocationFilter={handleLocationFilter}
          fields={fields}
        />
      </div>
      
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="h-8 w-8 mx-auto animate-spin mb-2" />
          <p className="text-muted-foreground">Loading opportunities...</p>
        </div>
      ) : filteredOpportunities.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <h3 className="text-lg font-medium">No opportunities found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search filters to find more results.
          </p>
        </div>
      )}
    </div>
  );
}
