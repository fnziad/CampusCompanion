
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CollaborationController } from '@/controllers/CollaborationController';
import { Collaboration, CollaborationMember } from '@/types';
import { Loader2, Phone } from 'lucide-react';
import CollaborationHeader from './CollaborationHeader';
import CollaborationSidebar from './CollaborationSidebar';
import ThesisGroupSection from './ThesisGroupSection';
import StudyHelpSection from './StudyHelpSection';
import ResearchProjectSection from './ResearchProjectSection';
import SmallTaskSection from './SmallTaskSection';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function CollaborationDetail() {
  const { id } = useParams<{ id: string }>();
  const [collaboration, setCollaboration] = useState<Collaboration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<CollaborationMember | null>(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isUserMember, setIsUserMember] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("(555) 123-4567");

  // Type-specific styling
  const [typeStyling, setTypeStyling] = useState({
    bgColor: 'bg-primary/5',
    borderColor: 'border-primary',
    badgeClass: 'bg-primary/10 text-primary',
    actionText: 'Join Group'
  });

  useEffect(() => {
    const fetchCollaboration = async () => {
      if (!id) {
        setError("No collaboration ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await CollaborationController.getCollaborationById(id);
        
        if (data) {
          setCollaboration(data);
          
          // Set styling based on collaboration type
          if (data.type === 'Thesis Group') {
            setTypeStyling({
              bgColor: 'bg-amber-500/5',
              borderColor: 'border-amber-500',
              badgeClass: 'bg-amber-100 text-amber-800',
              actionText: 'Join Group'
            });
          } else if (data.type === 'Study Help') {
            setTypeStyling({
              bgColor: 'bg-blue-500/5',
              borderColor: 'border-blue-500',
              badgeClass: 'bg-blue-100 text-blue-800',
              actionText: 'Join Study Group'
            });
          } else if (data.type === 'Research Project') {
            setTypeStyling({
              bgColor: 'bg-purple-500/5',
              borderColor: 'border-purple-500',
              badgeClass: 'bg-purple-100 text-purple-800',
              actionText: 'Join Project'
            });
          } else if (data.type === 'Small Task') {
            setTypeStyling({
              bgColor: 'bg-orange-500/5',
              borderColor: 'border-orange-500',
              badgeClass: 'bg-orange-100 text-orange-800',
              actionText: data.isPaid ? 'Apply for Task' : 'Help with Task'
            });
          }
          
          generateRandomPhoneNumber();
        } else {
          setError("Collaboration not found");
        }
      } catch (err) {
        console.error("Error fetching collaboration:", err);
        setError("Failed to load collaboration details");
      } finally {
        setLoading(false);
      }
    };

    fetchCollaboration();
  }, [id]);
  
  // Handle member click to show their details
  const handleMemberClick = (member: CollaborationMember) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
    toast.info(`Viewing ${member.name}'s profile`);
  };
  
  // Generate a random phone number for demo purposes
  const generateRandomPhoneNumber = () => {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const firstPart = Math.floor(Math.random() * 900) + 100;
    const secondPart = Math.floor(Math.random() * 9000) + 1000;
    setPhoneNumber(`(${areaCode}) ${firstPart}-${secondPart}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Loading collaboration details...</p>
      </div>
    );
  }

  if (error || !collaboration) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
        <p className="text-lg">{error || "Failed to load collaboration details"}</p>
      </div>
    );
  }

  return (
    <div>
      <CollaborationHeader collaboration={collaboration} styling={typeStyling} />
      
      <div className="container mx-auto py-6 px-4">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {collaboration.type === 'Thesis Group' && (
              <ThesisGroupSection 
                collaboration={collaboration} 
                isUserMember={isUserMember}
                handleMemberClick={handleMemberClick}
                styling={typeStyling} 
              />
            )}
            
            {collaboration.type === 'Study Help' && (
              <StudyHelpSection collaboration={collaboration} styling={typeStyling} />
            )}
            
            {collaboration.type === 'Research Project' && (
              <ResearchProjectSection collaboration={collaboration} styling={typeStyling} />
            )}
            
            {collaboration.type === 'Small Task' && (
              <SmallTaskSection collaboration={collaboration} styling={typeStyling} />
            )}
          </div>
          
          <CollaborationSidebar 
            collaboration={collaboration} 
            styling={typeStyling} 
            phoneNumber={phoneNumber} 
          />
        </div>
      </div>
      
      {/* Member profile dialog */}
      <Dialog open={isMemberModalOpen} onOpenChange={setIsMemberModalOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedMember && (
            <div className="flex flex-col items-center p-4">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={selectedMember.profilePicture} />
                <AvatarFallback>{selectedMember.name[0]}</AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-bold mb-1">{selectedMember.name}</h2>
              
              <div className="mb-4">
                {selectedMember.role === "Team Lead" ? (
                  <Badge className="bg-amber-100 text-amber-800">Team Lead</Badge>
                ) : (
                  <Badge variant="outline">Team Member</Badge>
                )}
              </div>
              
              <div className="w-full space-y-4">
                {selectedMember.skills?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="bg-primary/10">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Phone className="h-4 w-4" />
                  <span>{phoneNumber}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
