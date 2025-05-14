
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, BookOpen, FileText, Shield } from "lucide-react";

interface AdminDashboardCardsProps {
  userCount: number;
  activeUserCount: number;
  hibernatedUserCount: number;
  courseCount: number;
  departmentCount: number;
  resourceCount: number;
  approvedResourceCount: number;
  pendingResourceCount: number;
  moderatorCount: number;
}

export function AdminDashboardCards({
  userCount,
  activeUserCount,
  hibernatedUserCount,
  courseCount,
  departmentCount,
  resourceCount,
  approvedResourceCount,
  pendingResourceCount,
  moderatorCount,
}: AdminDashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userCount}</div>
          <p className="text-xs text-muted-foreground">
            {activeUserCount} active, {hibernatedUserCount} hibernated
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{courseCount}</div>
          <p className="text-xs text-muted-foreground">
            Across {departmentCount} departments
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resources</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{resourceCount}</div>
          <p className="text-xs text-muted-foreground">
            {approvedResourceCount} approved, {pendingResourceCount} pending
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Moderators</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{moderatorCount}</div>
          <p className="text-xs text-muted-foreground">
            + 1 Super Admin (you)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
