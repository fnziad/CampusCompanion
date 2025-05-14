
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Briefcase, GraduationCap, MessageSquare, Users } from "lucide-react";
import { Collaboration } from "@/types";

interface CollaborationHeaderProps {
  collaboration: Collaboration;
  styling: {
    bgColor: string;
    badgeClass: string;
  };
}

export default function CollaborationHeader({ collaboration, styling }: CollaborationHeaderProps) {
  // Function to get icon based on collaboration type
  const getTypeIcon = () => {
    switch (collaboration.type) {
      case 'Thesis Group':
        return <GraduationCap className="h-6 w-6" />;
      case 'Study Help':
        return <BookOpen className="h-6 w-6" />;
      case 'Research Project':
        return <Briefcase className="h-6 w-6" />;
      case 'Small Task':
        return <MessageSquare className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  return (
    <div className={`py-12 ${styling.bgColor}`}>
      <div className="container mx-auto px-4">
        <Link to="/collaboration" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Collaboration Hub
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <Badge className={`${styling.badgeClass}`}>{collaboration.type}</Badge>
          {collaboration.type === "Small Task" && collaboration.isPaid && (
            <Badge variant="outline" className="bg-green-100 text-green-800">Paid</Badge>
          )}
          <Badge variant="outline">{collaboration.academicLevel} Level</Badge>
        </div>
        
        <h1 className="text-3xl font-bold font-heading tracking-tight">{collaboration.title}</h1>
        <div className="flex items-center mt-2 text-muted-foreground">
          {getTypeIcon()}
          <span className="ml-2">Posted on {format(parseISO(collaboration.createdAt), 'MMMM d, yyyy')}</span>
        </div>
      </div>
    </div>
  );
}
