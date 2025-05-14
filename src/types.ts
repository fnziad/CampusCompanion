
export type UserRole = 'Guest' | 'Contributor' | 'Moderator' | 'SuperAdmin';

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  bio?: string;
  socialLinks?: SocialLinks;
  wishlist?: string[]; // Array of opportunity IDs saved by the user
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  resourceCount: number;
  department: string;
}

export interface Rating {
  userId: string;
  rating: number;
  comment?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'presentation' | 'link' | 'other';
  url: string;
  courseId: string;
  uploadedBy: string;
  uploadDate: string;
  approved: boolean;
  ratings: Rating[];
}

export type OpportunityType = 'internship' | 'job' | 'research';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  field: string; // E.g., "Computer Science", "Marketing", etc.
  location: string; // E.g., "Dhaka", "Remote", "Hybrid"
  eligibility: string;
  applicationSteps: string;
  postedBy: string; // User ID of moderator or admin who posted
  deadline: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface Application {
  userId: string;
  opportunityId: string;
  name: string;
  email: string;
  coverNote: string;
  resumeLink?: string;
  submittedAt: string; // ISO date string
}

export type CollaborationType = 'Thesis Group' | 'Study Help' | 'Research Project' | 'Small Task';
export type MeetingFormat = 'Online' | 'In-person' | 'Hybrid';

export interface CollaborationMember {
  userId: string;
  name: string;
  profilePicture?: string;
  joinedAt: string;
  skills?: string[];
  role?: string;
}

export interface ResearchProposal {
  userId: string;
  name: string;
  profilePicture?: string;
  proposalText: string;
  submittedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Collaboration {
  id: string;
  title: string;
  type: CollaborationType;
  description: string;
  requiredSkills: string[];
  academicLevel: string;
  createdBy: string;
  meetingFormat?: MeetingFormat;
  deadline: string;
  createdAt: string;
  
  // Thesis Group specific fields
  thesisTopic?: string;
  department?: string;
  currentMembers?: CollaborationMember[];
  teamLead?: string;
  maxMembers?: number;
  
  // Study Help specific fields
  courseName?: string;
  studyGoals?: string[];
  
  // Research Project specific fields
  projectScope?: string;
  timeline?: {
    start: string;
    end: string;
  };
  proposals?: ResearchProposal[];
  
  // Small Task specific fields
  isPaid?: boolean;
  paymentAmount?: string;
  estimatedHours?: number;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  applicationUrl: string;
  postedDate: string;
  deadline: string;
}
