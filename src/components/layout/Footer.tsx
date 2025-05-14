import { BookOpen, Github, Heart, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a 
            href="https://github.com/fnziad" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/fahadnadimziad" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="bg-gradient-to-br from-primary to-accent rounded-md p-1.5 shadow-lg">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-heading font-bold text-base">
              CampusCompanion
            </span>
          </div>
          <p className="text-center md:text-left text-xs leading-5 text-muted-foreground">
            Made with <Heart className="h-3 w-3 inline text-red-500" /> for BRAC University students
          </p>
        </div>
      </div>
    </footer>
  );
}
