
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showAdminKeyField, setShowAdminKeyField] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login({ email, password });
    
    if (success) {
      if (email === "superadmin@campuscompanion.com" && !showAdminKeyField) {
        // Show admin key field for super admin
        setShowAdminKeyField(true);
        return;
      }
      
      if (showAdminKeyField && adminKey !== "SupremeRuler123") {
        // Invalid admin key
        return;
      }
      
      // Redirect to home page or last visited page
      navigate("/");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          {isAdminLogin 
            ? "Enter your admin credentials to access the dashboard" 
            : "Sign in to your account to continue"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {showAdminKeyField && (
            <div className="space-y-2 animate-fade-in">
              <label htmlFor="adminKey" className="text-sm font-medium leading-none">
                Super Admin Key
              </label>
              <Input
                id="adminKey"
                type="password"
                placeholder="Enter your super admin key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                A special key is required to access Super Admin privileges.
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : "Sign In"}
          </Button>
          
          <div className="mt-4 text-center text-sm flex gap-2 justify-center">
            <span>Don't have an account?</span>
            <Button variant="link" className="p-0 h-auto">Register</Button>
          </div>
          
          <Button 
            type="button" 
            variant="ghost" 
            className="mt-2 text-xs" 
            onClick={() => setIsAdminLogin(!isAdminLogin)}
          >
            {isAdminLogin ? "Standard Login" : "Admin Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
