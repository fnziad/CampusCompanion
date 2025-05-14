
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { OpportunityController } from "@/controllers/OpportunityController";
import { Application } from "@/types";

interface ApplicationFormProps {
  opportunityId: string;
  onSuccess: () => void;
}

type FormData = {
  name: string;
  email: string;
  coverNote: string;
};

export default function ApplicationForm({ opportunityId, onSuccess }: ApplicationFormProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      coverNote: ""
    }
  });
  
  const onSubmit = async (data: FormData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    // Create application object
    const application: Application = {
      userId: user.id,
      opportunityId,
      name: data.name,
      email: data.email,
      coverNote: data.coverNote,
      submittedAt: new Date().toISOString(),
    };
    
    try {
      // Submit application
      await OpportunityController.applyForOpportunity(user.id, opportunityId, application);
      onSuccess();
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name
        </label>
        <Input
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="coverNote" className="text-sm font-medium">
          Cover Note
        </label>
        <Textarea
          id="coverNote"
          rows={5}
          placeholder="Write a brief note about why you're interested in this opportunity and why you'd be a good fit."
          {...register("coverNote", { 
            required: "Cover note is required",
            maxLength: {
              value: 500,
              message: "Cover note should be less than 500 characters"
            }
          })}
        />
        {errors.coverNote && (
          <p className="text-xs text-destructive">{errors.coverNote.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : "Submit Application"}
      </Button>
    </form>
  );
}
