
// User types
export type UserRole = 'Guest' | 'Contributor' | 'Moderator' | 'SuperAdmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  bio?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  skills?: string[];
  academicLevel?: string;
  department?: string;
  wishlist?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Course types
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

// Resource types
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  courseId: string;
  userId: string;
  uploadDate: string;
  approved: boolean;
  ratings: {
    userId: string;
    rating: number;
    comment?: string;
  }[];
}

// Collaboration types
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
  currentMembers?: CollaborationMember[];
  teamLead?: string;
  maxMembers?: number;
  department?: string;
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

export type CollaborationType = 'Thesis Group' | 'Study Help' | 'Research Project' | 'Small Task';
export type MeetingFormat = 'Online' | 'In-person' | 'Hybrid';

// Opportunity types
export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: string;
  field: string;
  location: string;
  eligibility: string;
  applicationSteps: string;
  postedBy: string;
  deadline: string;
  createdAt: string;
}

export interface Application {
  userId: string;
  opportunityId: string;
  name: string;
  email: string;
  coverNote: string;
  submittedAt: string;
}
