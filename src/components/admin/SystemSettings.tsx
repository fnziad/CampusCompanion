
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SystemSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings Coming Soon</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This section will allow you to:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>Configure system-wide preferences</li>
          <li>Manage email notifications and templates</li>
          <li>Set security policies and access controls</li>
          <li>Configure integration with other systems</li>
        </ul>
      </CardContent>
    </Card>
  );
}
