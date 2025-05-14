
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function ResumeBuilderSection() {
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const navigate = useNavigate();
  
  const handleOpenFullResume = () => {
    navigate('/resume');
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Resume Builder</CardTitle>
      </CardHeader>
      <CardContent>
        {showResumeBuilder ? (
          <div className="h-[600px] w-full border rounded-md overflow-hidden">
            <iframe 
              src="https://ccresumemaker.vercel.app/" 
              className="w-full h-full"
              title="Resume Builder"
            />
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Use our integrated resume builder to create a professional resume
            </p>
            <div className="space-x-4">
              <Button onClick={() => setShowResumeBuilder(true)}>
                Quick Preview
              </Button>
              <Button variant="outline" onClick={handleOpenFullResume}>
                Open Full Screen
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
