
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Resume() {
  const [loading, setLoading] = useState(true);
  const resumeIframeRef = useRef<HTMLIFrameElement>(null);
  const { user } = useAuth();
  const resumeBuilderUrl = "https://ccresumemaker.vercel.app/";

  useEffect(() => {
    const iframe = resumeIframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        setLoading(false);
      };
    }

    // If iframe doesn't load in 5 seconds, stop showing loading indicator
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-background z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      
      <iframe
        ref={resumeIframeRef}
        src={resumeBuilderUrl}
        className="w-full h-full border-none flex-1"
        title="Resume Builder"
        seamless
      />
    </div>
  );
}
