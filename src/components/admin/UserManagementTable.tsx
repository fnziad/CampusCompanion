
import { useState } from "react";
import { toast } from "sonner";
import { User, UserCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserManagementTableProps {
  users: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  }[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

export function UserManagementTable({ users, setUsers }: UserManagementTableProps) {
  const handlePromoteToModerator = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, role: 'Moderator' };
      }
      return u;
    }));
    toast.success("User promoted to Moderator");
  };
  
  const handleDemoteUser = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, role: 'Contributor' };
      }
      return u;
    }));
    toast.success("User demoted to Contributor");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant={
                user.role === 'SuperAdmin' ? 'destructive' : 
                user.role === 'Moderator' ? 'default' : 
                'outline'
              }>
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.status === 'active' ? 'outline' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {user.role !== 'SuperAdmin' && user.role !== 'Moderator' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePromoteToModerator(user.id)}
                  className="mr-2"
                >
                  <UserCheck className="w-4 h-4 mr-1" />
                  Make Moderator
                </Button>
              )}
              {user.role === 'Moderator' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDemoteUser(user.id)}
                >
                  <User className="w-4 h-4 mr-1" />
                  Demote
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
