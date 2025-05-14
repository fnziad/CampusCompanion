
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Users, Briefcase, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-heading">About CampusCompanion</h1>
          <p className="text-xl text-muted-foreground">Your all-in-one platform for academic success</p>
        </div>
        
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 font-heading">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                CampusCompanion aims to empower students by providing a comprehensive suite of tools designed to enhance the academic journey. We believe in collaborative learning and resource sharing to help every student succeed.
              </p>
              <p className="text-muted-foreground">
                Our platform brings together essential resources, productivity tools, and career opportunities in one place, making it easier for students to focus on what matters most: their education.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl text-center flex flex-col items-center">
                  <BookOpen className="h-10 w-10 text-primary mb-2" />
                  <h3 className="font-medium">Course Hub</h3>
                </div>
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-xl text-center flex flex-col items-center">
                  <FileText className="h-10 w-10 text-secondary mb-2" />
                  <h3 className="font-medium">Resume Maker</h3>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-xl text-center flex flex-col items-center">
                  <FlaskConical className="h-10 w-10 text-accent mb-2" />
                  <h3 className="font-medium">Flashcards</h3>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-accent/5 p-4 rounded-xl text-center flex flex-col items-center">
                  <Briefcase className="h-10 w-10 text-primary mb-2" />
                  <h3 className="font-medium">Opportunities</h3>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-10">
            <h2 className="text-3xl font-bold mb-6 font-heading">Our Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <BookOpen className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Module 1: Course Hub</CardTitle>
                  <CardDescription>Access all your course materials in one place</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Search and filter resources</li>
                    <li>• Upload and share materials</li>
                    <li>• Rate and review content</li>
                    <li>• Organize by course</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <FileText className="h-6 w-6 text-secondary mb-2" />
                  <CardTitle>Module 2: Resume Builder</CardTitle>
                  <CardDescription>Create professional resumes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">Coming Soon</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Professional templates</li>
                    <li>• ATS-friendly formatting</li>
                    <li>• Industry-specific recommendations</li>
                    <li>• Export to PDF/Word</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <FlaskConical className="h-6 w-6 text-accent mb-2" />
                  <CardTitle>Module 3: Study Tools</CardTitle>
                  <CardDescription>Enhance your learning experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">Coming Soon</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Interactive flashcards</li>
                    <li>• Study progress tracking</li>
                    <li>• Collaborative study groups</li>
                    <li>• Personalized study plans</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="card-hover col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Modules 4 & 5: Opportunities & Collaboration</CardTitle>
                  <CardDescription>Expand your horizons beyond the classroom</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">Coming Soon</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Opportunities</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Internship listings</li>
                        <li>• Research opportunities</li>
                        <li>• Job board</li>
                        <li>• Career events</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Collaboration</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Team formation</li>
                        <li>• Project management</li>
                        <li>• Peer feedback</li>
                        <li>• Skill sharing</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="border-t pt-10 text-center">
            <h2 className="text-3xl font-bold mb-4 font-heading">Ready to get started?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join CampusCompanion today and take advantage of our integrated tools to enhance your academic journey.
            </p>
            <Link to="/courses">
              <Button size="lg" className="px-8">
                Explore Our Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
