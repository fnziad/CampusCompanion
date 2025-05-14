import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { CollaborationCard } from "@/components/collaboration/CollaborationCard";
import { CollaborationFilters } from "@/components/collaboration/CollaborationFilters";
import { CollaborationForm } from "@/components/collaboration/CollaborationForm";
import { CollaborationController } from "@/controllers/CollaborationController";
import type { Collaboration } from "@/types";
import { BookOpen, GraduationCap, Briefcase, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Collaboration() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [filteredCollaborations, setFilteredCollaborations] = useState<Collaboration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  
  useEffect(() => {
    // Get all collaborations
    const fetchCollaborations = async () => {
      const allCollaborations = await CollaborationController.getCollaborations();
      setCollaborations(allCollaborations);
      applyFilters(allCollaborations);
    };
    
    fetchCollaborations();
  }, []);
  
  // Apply filters when they change
  useEffect(() => {
    applyFilters(collaborations);
  }, [activeTab, typeFilter]);
  
  const applyFilters = (allCollabs: Collaboration[]) => {
    let filtered = [...allCollabs];
    
    // Filter based on active tab
    if (activeTab !== "all") {
      filtered = filtered.filter(collab => collab.type === activeTab);
    }
    
    // Apply type filter if it's not "all" and different from active tab
    if (typeFilter !== "all" && typeFilter !== activeTab) {
      filtered = filtered.filter(collab => collab.type === typeFilter);
      // If a specific type is selected, it overrides the tab
      setActiveTab(typeFilter);
    }
    
    // Apply search query if it exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        collab => collab.title.toLowerCase().includes(query) ||
          collab.description.toLowerCase().includes(query) ||
          collab.requiredSkills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    setFilteredCollaborations(filtered);
  };

  const handleSearch = () => {
    applyFilters(collaborations);
    toast.success("Filters applied successfully");
  };

  const handleJoinStudyGroup = (id: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to join a study group");
      return;
    }
    
    toast.success("Join request sent successfully!");
  };

  return (
    <>
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold font-heading tracking-tight">Student Collaboration Hub</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Connect with fellow students for thesis groups, study sessions, research projects, and small tasks.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="space-y-6">
            <CollaborationFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              onSearch={handleSearch}
            />
            
            {isAuthenticated && <CollaborationForm />}
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="all" className="flex items-center gap-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="Thesis Group" className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Thesis Groups</span>
                  <span className="sm:hidden">Thesis</span>
                </TabsTrigger>
                <TabsTrigger value="Study Help" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Study Help</span>
                  <span className="sm:hidden">Study</span>
                </TabsTrigger>
                <TabsTrigger value="Research Project" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Research</span>
                  <span className="sm:hidden">Research</span>
                </TabsTrigger>
                <TabsTrigger value="Small Task" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Small Tasks</span>
                  <span className="sm:hidden">Tasks</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {renderCollaborations(filteredCollaborations)}
              </TabsContent>
              
              <TabsContent value="Thesis Group" className="mt-0">
                <div className="mb-6 bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg">
                  <h2 className="text-lg font-semibold flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Thesis Groups
                  </h2>
                  <p className="text-muted-foreground">
                    Form or join thesis groups with students who share your research interests and complement your skills.
                  </p>
                </div>
                {renderCollaborations(filteredCollaborations)}
              </TabsContent>
              
              <TabsContent value="Study Help" className="mt-0">
                <div className="mb-6 bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-lg">
                  <h2 className="text-lg font-semibold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Study Help
                  </h2>
                  <p className="text-muted-foreground">
                    Connect with peers for group study sessions, assignment help, or exam preparation.
                  </p>
                </div>
                {renderCollaborations(filteredCollaborations)}
              </TabsContent>
              
              <TabsContent value="Research Project" className="mt-0">
                <div className="mb-6 bg-gradient-to-r from-purple-500/10 to-transparent p-4 rounded-lg">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Research Projects
                  </h2>
                  <p className="text-muted-foreground">
                    Find research collaborators or join existing projects to gain valuable experience and build your portfolio.
                  </p>
                </div>
                {renderCollaborations(filteredCollaborations)}
              </TabsContent>
              
              <TabsContent value="Small Task" className="mt-0">
                <div className="mb-6 bg-gradient-to-r from-orange-500/10 to-transparent p-4 rounded-lg">
                  <h2 className="text-lg font-semibold flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Small Tasks
                  </h2>
                  <p className="text-muted-foreground">
                    Offer or find help with quick tasks like proofreading, design work, or coding assistance.
                  </p>
                </div>
                {renderCollaborations(filteredCollaborations)}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
  
  function renderCollaborations(collaborations: Collaboration[]) {
    if (collaborations.length === 0) {
      return (
        <div className="text-center py-12 border rounded-lg bg-background">
          <h3 className="text-lg font-medium">No collaborations found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          
          {isAuthenticated && (
            <Button className="mt-4">
              Create a Collaboration Post
            </Button>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {collaborations.map((collaboration) => (
          <CollaborationCard 
            key={collaboration.id} 
            collaboration={collaboration}
            onJoinStudyGroup={handleJoinStudyGroup} 
          />
        ))}
      </div>
    );
  }
}
