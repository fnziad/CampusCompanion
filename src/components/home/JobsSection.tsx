
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobOpportunity } from "@/types";
import { ArrowRight, Briefcase, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import jobsData from "@/data/jobs.json";
import { format } from "date-fns";

export default function JobsSection() {
  // Cast the imported data to match our JobOpportunity type
  const typedJobsData = jobsData as JobOpportunity[];
  
  // Get 2 featured job opportunities
  const featuredJobs: JobOpportunity[] = typedJobsData.slice(0, 2);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  // Function to get badge color based on job type
  const getJobTypeBadge = (type: string) => {
    switch(type) {
      case 'internship':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800">Internship</Badge>;
      case 'research':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 border-purple-200 dark:border-purple-800">Research</Badge>;
      case 'full-time':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800">Full-time</Badge>;
      case 'part-time':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800">Part-time</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold font-heading tracking-tight">Latest Opportunities</h2>
            <p className="text-muted-foreground mt-1">Discover jobs, internships, and research positions</p>
          </div>
          <Link to="/opportunities" className="flex items-center text-sm font-medium text-primary hover:underline">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="card-hover">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{job.title}</CardTitle>
                  {getJobTypeBadge(job.type)}
                </div>
                <CardDescription className="flex items-center">
                  <Briefcase className="mr-1 h-4 w-4" />
                  {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-3 text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {job.location}
                </div>
                <p className="line-clamp-2 text-sm">{job.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-1">Requirements:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {job.requirements.slice(0, 2).map((req, index) => (
                      <li key={index} className="line-clamp-1">{req}</li>
                    ))}
                    {job.requirements.length > 2 && <li>+ {job.requirements.length - 2} more</li>}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  Deadline: {formatDate(job.deadline)}
                </div>
                <a 
                  href={job.applicationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary text-sm hover:underline"
                >
                  Apply Now
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
