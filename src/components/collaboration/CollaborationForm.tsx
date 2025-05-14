
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CollaborationController } from "@/controllers/CollaborationController";
import type { CollaborationType, MeetingFormat } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

export function CollaborationForm() {
  const { user } = useAuth();
  const [collabType, setCollabType] = useState<CollaborationType>("Thesis Group");
  const [open, setOpen] = useState(false);
  
  // Form fields for all collaboration types
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [deadline, setDeadline] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [meetingFormat, setMeetingFormat] = useState<MeetingFormat | "">("");
  
  // Thesis Group specific fields
  const [thesisTopic, setThesisTopic] = useState("");
  const [department, setDepartment] = useState("");
  const [maxMembers, setMaxMembers] = useState(4);
  
  // Study Help specific fields
  const [courseName, setCourseName] = useState("");
  const [studyGoals, setStudyGoals] = useState("");
  
  // Research Project specific fields
  const [projectScope, setProjectScope] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Small Task specific fields
  const [isPaid, setIsPaid] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [estimatedHours, setEstimatedHours] = useState<number | undefined>(undefined);
  
  // Validate form based on selected collaboration type
  const validateForm = () => {
    const commonFieldsValid = title && description && requiredSkills && deadline && academicLevel;
    
    if (!commonFieldsValid) return false;
    
    switch(collabType) {
      case "Thesis Group":
        return !!thesisTopic && !!department && !!maxMembers;
      case "Study Help":
        return !!courseName && !!studyGoals && !!meetingFormat;
      case "Research Project":
        return !!projectScope && !!startDate && !!endDate;
      case "Small Task":
        return true; // Only optional fields specific to Small Task
      default:
        return false;
    }
  };
  
  // Reset form when collaboration type changes
  const handleTypeChange = (value: string) => {
    setCollabType(value as CollaborationType);
    // Reset form fields specific to collaboration types
    setThesisTopic("");
    setDepartment("");
    setMaxMembers(4);
    setCourseName("");
    setStudyGoals("");
    setProjectScope("");
    setStartDate("");
    setEndDate("");
    setIsPaid(false);
    setPaymentAmount("");
    setEstimatedHours(undefined);
  };
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create a collaboration post");
      return;
    }
    
    // Create collaboration object with common fields
    const newCollaboration = {
      id: `col${Math.random().toString(36).substr(2, 9)}`,
      title,
      type: collabType,
      description,
      requiredSkills: requiredSkills.split(',').map(skill => skill.trim()),
      academicLevel,
      createdBy: user.id,
      meetingFormat: meetingFormat as MeetingFormat || undefined,
      deadline,
      createdAt: new Date().toISOString()
    };
    
    // Add type-specific fields
    switch(collabType) {
      case "Thesis Group":
        Object.assign(newCollaboration, {
          thesisTopic,
          department,
          maxMembers,
          currentMembers: [
            {
              userId: user.id,
              name: user.name,
              profilePicture: user.profilePicture,
              joinedAt: new Date().toISOString(),
              role: "Team Lead"
            }
          ],
          teamLead: user.id
        });
        break;
      
      case "Study Help":
        Object.assign(newCollaboration, {
          courseName,
          studyGoals: studyGoals.split(',').map(goal => goal.trim())
        });
        break;
      
      case "Research Project":
        Object.assign(newCollaboration, {
          projectScope,
          timeline: {
            start: startDate,
            end: endDate
          },
          proposals: []
        });
        break;
      
      case "Small Task":
        Object.assign(newCollaboration, {
          isPaid,
          paymentAmount: isPaid ? paymentAmount : undefined,
          estimatedHours
        });
        break;
    }
    
    // Submit the collaboration
    CollaborationController.addCollaboration(newCollaboration);
    setOpen(false);
    resetForm();
  };
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setRequiredSkills("");
    setDeadline("");
    setAcademicLevel("");
    setMeetingFormat("");
    setThesisTopic("");
    setDepartment("");
    setMaxMembers(4);
    setCourseName("");
    setStudyGoals("");
    setProjectScope("");
    setStartDate("");
    setEndDate("");
    setIsPaid(false);
    setPaymentAmount("");
    setEstimatedHours(undefined);
    setCollabType("Thesis Group");
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Create Collaboration</CardTitle>
        <CardDescription>Post your own collaboration request</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Create New Post</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create Collaboration Post</DialogTitle>
              <DialogDescription>
                Fill out the details to find collaborators for your project, thesis, or study group
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Title</Label>
                <Input 
                  id="post-title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Write a clear, descriptive title" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="post-type">Collaboration Type</Label>
                <Tabs 
                  defaultValue={collabType} 
                  onValueChange={handleTypeChange}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="Thesis Group">Thesis Group</TabsTrigger>
                    <TabsTrigger value="Study Help">Study Help</TabsTrigger>
                    <TabsTrigger value="Research Project">Research</TabsTrigger>
                    <TabsTrigger value="Small Task">Small Task</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="Thesis Group" className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="thesis-topic">Thesis Topic</Label>
                      <Input 
                        id="thesis-topic" 
                        value={thesisTopic}
                        onChange={(e) => setThesisTopic(e.target.value)}
                        placeholder="Specific area of research for your thesis" 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select value={department} onValueChange={setDepartment} required>
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                            <SelectItem value="Business Administration">Business Administration</SelectItem>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="max-members">Maximum Team Size</Label>
                        <Select 
                          value={maxMembers.toString()} 
                          onValueChange={(val) => setMaxMembers(Number(val))}
                        >
                          <SelectTrigger id="max-members">
                            <SelectValue placeholder="Select maximum members" />
                          </SelectTrigger>
                          <SelectContent>
                            {[2, 3, 4, 5, 6].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} members</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="Study Help" className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="course-name">Course Name/Code</Label>
                      <Input 
                        id="course-name" 
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        placeholder="E.g., CSE220: Data Structures" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="study-goals">Study Goals (comma-separated)</Label>
                      <Input 
                        id="study-goals" 
                        value={studyGoals}
                        onChange={(e) => setStudyGoals(e.target.value)}
                        placeholder="E.g., Exam Preparation, Problem Solving, Concept Review" 
                        required 
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="Research Project" className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-scope">Project Scope</Label>
                      <Textarea 
                        id="project-scope" 
                        value={projectScope}
                        onChange={(e) => setProjectScope(e.target.value)}
                        placeholder="Description of the research project scope and objectives" 
                        className="min-h-[80px]"
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input 
                          id="start-date" 
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Input 
                          id="end-date" 
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="Small Task" className="pt-4 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="is-paid" 
                        checked={isPaid}
                        onCheckedChange={(checked) => setIsPaid(!!checked)}
                      />
                      <Label htmlFor="is-paid">This is a paid task</Label>
                    </div>
                    
                    {isPaid && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="payment-amount">Payment Amount</Label>
                          <Input 
                            id="payment-amount" 
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            placeholder="E.g., 1000 BDT, $20, etc." 
                            required={isPaid}
                          />
                          <p className="text-xs text-muted-foreground">
                            Note: Payments are handled offline
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="estimated-hours">Estimated Hours</Label>
                          <Input 
                            id="estimated-hours" 
                            type="number"
                            value={estimatedHours?.toString() || ""}
                            onChange={(e) => setEstimatedHours(e.target.value ? Number(e.target.value) : undefined)}
                            placeholder="Approximate work hours" 
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="post-description">Description</Label>
                <Textarea 
                  id="post-description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you're looking for, requirements, timeline, etc." 
                  className="min-h-[120px]"
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="post-skills">Required Skills (comma-separated)</Label>
                  <Input 
                    id="post-skills" 
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    placeholder="E.g., Python, Research, Data Analysis" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="post-deadline">Deadline</Label>
                  <Input 
                    id="post-deadline" 
                    type="date" 
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="post-level">Academic Level</Label>
                  <Select value={academicLevel} onValueChange={setAcademicLevel} required>
                    <SelectTrigger id="post-level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                      <SelectItem value="Both">Both Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {(collabType === "Study Help" || collabType === "Thesis Group") && (
                  <div className="space-y-2">
                    <Label htmlFor="post-format">Meeting Format</Label>
                    <Select 
                      value={meetingFormat} 
                      onValueChange={(value: string) => {
                        // Handle the string type from onValueChange
                        if (value === "Online" || value === "In-person" || value === "Hybrid" || value === "") {
                          setMeetingFormat(value as MeetingFormat | "");
                        }
                      }}
                    >
                      <SelectTrigger id="post-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="In-person">In-person</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button type="submit">Post Collaboration</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
