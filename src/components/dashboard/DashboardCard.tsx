
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

type DashboardCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  gradient: string;
  description: string;
}

export function DashboardCard({ title, value, icon, gradient, description }: DashboardCardProps) {
  return (
    <Card className={`bg-gradient-to-br ${gradient}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between">
          <span>{title}</span>
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardFooter>
    </Card>
  );
}
