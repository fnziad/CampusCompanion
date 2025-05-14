
import { Collaboration } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, BookOpen, Briefcase, MessageSquare, DollarSign, Clock, School, GraduationCap, Package, Phone } from "lucide-react";
import { format, parseISO, isAfter } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface CollaborationCardProps {
  collaboration: Collaboration;
  onJoinStudyGroup?: (id: string) => void;
}

export function CollaborationCard({ collaboration, onJoinStudyGroup }: CollaborationCardProps) {
  const isUrgent = (deadline: string) => {
    const today = new Date();
    const deadlineDate = parseISO(deadline);
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);
    
    return isAfter(deadlineDate, today) && !isAfter(deadlineDate, sevenDaysLater);
  };
  
  // Calculate members progress for Thesis Group
  const getMembersProgress = () => {
    if (!collaboration.currentMembers || !collaboration.maxMembers) return 0;
    return (collaboration.currentMembers.length / collaboration.maxMembers) * 100;
  };
  
  const handleCardAction = (e: React.MouseEvent) => {
    if (collaboration.type === "Study Help" && onJoinStudyGroup) {
      e.preventDefault();
      onJoinStudyGroup(collaboration.id);
    }
  };

  // Generate phone number display (in a real app, this would come from the database)
  const phoneNumber = "(123) 456-7890";

  // Render different card styles based on collaboration type
  switch (collaboration.type) {
    case 'Thesis Group':
      return (
        <Card className="group hover:shadow-md transition-shadow border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {isUrgent(collaboration.deadline) && (
                    <Badge variant="destructive">Urgent</Badge>
                  )}
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Thesis Group</Badge>
                </div>
                <CardTitle>{collaboration.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  <span>{collaboration.academicLevel} Level</span>
                  {collaboration.department && (
                    <span className="ml-1">• {collaboration.department}</span>
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2 mb-4">{collaboration.description}</p>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {collaboration.requiredSkills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-amber-50">{skill}</Badge>
                ))}
                {collaboration.requiredSkills.length > 3 && (
                  <Badge variant="outline">+{collaboration.requiredSkills.length - 3}</Badge>
                )}
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Team Members</span>
                  <span className="text-xs font-medium">
                    {collaboration.currentMembers?.length || 1}/{collaboration.maxMembers || 4}
                  </span>
                </div>
                <Progress value={getMembersProgress()} className="h-1" />
                <div className="flex -space-x-2 mt-2">
                  {collaboration.currentMembers?.map((member, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={member.profilePicture} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )) || (
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarFallback>TL</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                
                <div className="flex items-center mt-3">
                  <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{phoneNumber}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              Deadline: {format(parseISO(collaboration.deadline), 'MMM d, yyyy')}
            </div>
            
            <RouterLink to={`/collaboration/${collaboration.id}`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-amber-500 text-amber-700 hover:bg-amber-50">
                Join Group
              </Button>
            </RouterLink>
          </CardFooter>
        </Card>
      );
      
    case 'Study Help':
      return (
        <Card className="group hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              {isUrgent(collaboration.deadline) && (
                <Badge variant="destructive">Urgent</Badge>
              )}
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Study Help</Badge>
            </div>
            <CardTitle>{collaboration.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{collaboration.academicLevel} Level</span>
              {collaboration.meetingFormat && (
                <span className="ml-1">• {collaboration.meetingFormat}</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2 mb-4">{collaboration.description}</p>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {collaboration.requiredSkills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50">{skill}</Badge>
                ))}
                {collaboration.requiredSkills.length > 3 && (
                  <Badge variant="outline">+{collaboration.requiredSkills.length - 3}</Badge>
                )}
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex items-center mb-3">
                  <School className="mr-1 h-4 w-4 text-blue-600" />
                  <span className="font-medium">{collaboration.courseName}</span>
                </div>
                
                <div>
                  <span className="text-xs text-muted-foreground block mb-2">Study Goals:</span>
                  <div className="flex flex-wrap gap-1">
                    {collaboration.studyGoals?.map((goal, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">{goal}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center mt-3">
                  <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{phoneNumber}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {format(parseISO(collaboration.deadline), 'MMM d, yyyy')}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-blue-500 text-blue-700 hover:bg-blue-50"
              onClick={(e) => handleCardAction(e)}
            >
              Join Study Group
            </Button>
          </CardFooter>
        </Card>
      );
      
    case 'Research Project':
      return (
        <Card className="group hover:shadow-md transition-shadow border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              {isUrgent(collaboration.deadline) && (
                <Badge variant="destructive">Urgent</Badge>
              )}
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Research Project</Badge>
            </div>
            <CardTitle>{collaboration.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Briefcase className="h-4 w-4 mr-1" />
              <span>{collaboration.academicLevel} Level</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2 mb-4">{collaboration.description}</p>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {collaboration.requiredSkills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-purple-50">{skill}</Badge>
                ))}
                {collaboration.requiredSkills.length > 3 && (
                  <Badge variant="outline">+{collaboration.requiredSkills.length - 3}</Badge>
                )}
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Project Timeline:</span>
                  {collaboration.timeline && (
                    <span className="text-xs">
                      {format(parseISO(collaboration.timeline.start), 'MMM d')} - {format(parseISO(collaboration.timeline.end), 'MMM d')}
                    </span>
                  )}
                </div>
                
                <div className="mt-3">
                  <span className="text-xs text-muted-foreground block">Research Scope:</span>
                  <p className="text-xs line-clamp-2 mt-1">{collaboration.projectScope}</p>
                </div>

                <div className="flex items-center mt-3">
                  <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{phoneNumber}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              Deadline: {format(parseISO(collaboration.deadline), 'MMM d, yyyy')}
            </div>
            
            <RouterLink to={`/collaboration/${collaboration.id}`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-purple-500 text-purple-700 hover:bg-purple-50">
                Submit Proposal
              </Button>
            </RouterLink>
          </CardFooter>
        </Card>
      );
      
    case 'Small Task':
      return (
        <Card className="group hover:shadow-md transition-shadow border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              {isUrgent(collaboration.deadline) && (
                <Badge variant="destructive">Urgent</Badge>
              )}
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Small Task</Badge>
              {collaboration.isPaid && (
                <Badge variant="outline" className="bg-green-50 text-green-700">Paid</Badge>
              )}
            </div>
            <CardTitle>{collaboration.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{collaboration.academicLevel} Level</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2 mb-4">{collaboration.description}</p>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {collaboration.requiredSkills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50">{skill}</Badge>
                ))}
                {collaboration.requiredSkills.length > 3 && (
                  <Badge variant="outline">+{collaboration.requiredSkills.length - 3}</Badge>
                )}
              </div>
              
              <div className="pt-2 border-t grid grid-cols-2 gap-2">
                {collaboration.isPaid && (
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">{collaboration.paymentAmount}</span>
                  </div>
                )}
                {collaboration.estimatedHours && (
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">~{collaboration.estimatedHours} hours</span>
                  </div>
                )}
                <div className="flex items-center col-span-2 mt-1">
                  <Package className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Quick delivery expected</span>
                </div>
                
                <div className="flex items-center col-span-2 mt-1">
                  <Phone className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{phoneNumber}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              Due: {format(parseISO(collaboration.deadline), 'MMM d, yyyy')}
            </div>
            
            <RouterLink to={`/collaboration/${collaboration.id}`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-green-500 text-green-700 hover:bg-green-50">
                Apply Now
              </Button>
            </RouterLink>
          </CardFooter>
        </Card>
      );

    default:
      return null;
  }
}
