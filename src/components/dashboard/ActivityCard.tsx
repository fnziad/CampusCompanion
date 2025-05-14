
import { BookOpen, Briefcase, MessageSquare, Users, Star, Clock, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ActivityCardProps = { 
  title: string; 
  date: string; 
  type: "opportunity" | "collaboration" | "saved"; 
  status: string;
  link: string;
};

export function ActivityCard({ title, date, type, status, link }: ActivityCardProps) {
  const getIcon = () => {
    switch (type) {
      case "opportunity":
        return <Briefcase className="h-5 w-5" />;
      case "collaboration":
        return <Users className="h-5 w-5" />;
      case "saved":
        return <Star className="h-5 w-5" />;
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };

  const getTypeText = () => {
    switch (type) {
      case "opportunity":
        return "Posted Opportunity";
      case "collaboration":
        return "Created Collaboration";
      case "saved":
        return "Saved Opportunity";
      default:
        return "Activity";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group">
      <Link to={link} className="block">
        <div className="flex gap-4 p-4">
          <div className={`p-2 rounded-full ${
            type === "opportunity" ? "bg-primary/10 text-primary" :
            type === "collaboration" ? "bg-blue-500/10 text-blue-500" :
            "bg-secondary/10 text-secondary"
          }`}>
            {getIcon()}
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-medium group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
            <div className="flex justify-between mt-1">
              <p className="text-sm text-muted-foreground">{getTypeText()}</p>
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
            <div className="mt-2">
              <Badge variant={status === "Active" ? "outline" : "secondary"} className="text-xs">
                {status}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
