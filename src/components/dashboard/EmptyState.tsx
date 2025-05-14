
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    link: string;
  };
  secondaryAction?: {
    label: string;
    link: string;
  };
}

export function EmptyState({ icon, title, description, primaryAction, secondaryAction }: EmptyStateProps) {
  return (
    <div className="text-center py-10 border rounded-lg bg-muted/20">
      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mx-auto mb-6">
        {description}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {primaryAction && (
          <Link to={primaryAction.link}>
            <Button>
              {primaryAction.label}
            </Button>
          </Link>
        )}
        {secondaryAction && (
          <Link to={secondaryAction.link}>
            <Button variant="outline" size="sm">
              {secondaryAction.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
