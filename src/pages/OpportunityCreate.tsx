
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { OpportunityController } from "@/controllers/OpportunityController";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Opportunity, OpportunityType } from "@/types";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  type: z.enum(["job", "internship", "research"] as const),
  field: z.string().min(2, "Field must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  eligibility: z.string().min(10, "Eligibility must be at least 10 characters"),
  applicationSteps: z.string().min(10, "Application steps must be at least 10 characters"),
  deadline: z.string().refine(val => new Date(val) > new Date(), {
    message: "Deadline must be in the future",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function OpportunityCreate() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if not admin or moderator
  if (!isAuthenticated || (user?.role !== 'SuperAdmin' && user?.role !== 'Moderator')) {
    navigate("/opportunities");
    return null;
  }
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "job",
      field: "",
      location: "",
      description: "",
      eligibility: "",
      applicationSteps: "",
      deadline: format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"), // 14 days from now
    },
  });
  
  const onSubmit = (data: FormData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    // Create unique ID (in a real app this would be handled by the backend)
    const id = `opp${Date.now().toString().slice(-6)}`;
    
    // Create opportunity object
    const opportunity: Opportunity = {
      id,
      title: data.title,
      description: data.description,
      type: data.type as OpportunityType,
      field: data.field,
      location: data.location,
      eligibility: data.eligibility,
      applicationSteps: data.applicationSteps,
      postedBy: user.id,
      deadline: new Date(data.deadline).toISOString(),
      createdAt: new Date().toISOString(),
    };
    
    // Submit opportunity
    setTimeout(() => {
      try {
        OpportunityController.createOpportunity(opportunity);
        toast.success("Opportunity created successfully!");
        navigate("/opportunities");
      } catch (error) {
        toast.error("Failed to create opportunity. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/opportunities")}
        className="mb-6 flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Opportunities
      </Button>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 font-heading">Post New Opportunity</h1>
        <p className="text-muted-foreground mb-8">
          Create a new job, internship, or research opportunity for students.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Frontend Developer Intern" {...field} />
                  </FormControl>
                  <FormDescription>
                    A clear, concise title for the opportunity.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="job">Job</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Dhaka, Remote, Hybrid" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Deadline</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detailed description of the opportunity..."
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="eligibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eligibility</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Requirements for eligible applicants..."
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="applicationSteps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Steps</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How to apply for this opportunity..."
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => navigate("/opportunities")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : "Create Opportunity"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
