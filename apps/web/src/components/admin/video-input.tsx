import { useState, useEffect } from "react";
import { Play, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoInputProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function VideoInput({ value, onChange, disabled = false, className }: VideoInputProps) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const extractedId = extractYouTubeId(value || "");
    setVideoId(extractedId);
    if (value && !extractedId) {
      setError("URL YouTube tidak valid");
    } else {
      setError("");
    }
  }, [value]);

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Video YouTube
        </label>
        <input
          type="text"
          value={value || ""}
          onChange={handleChange}
          disabled={disabled}
          placeholder="https://www.youtube.com/watch?v=..."
          className={cn(
            "w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500",
            error && "border-red-500 focus:ring-red-500"
          )}
        />
        {error && (
          <div className="flex items-center space-x-1 text-xs text-red-500 mt-1">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {videoId && (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Video Preview"
            className="absolute top-0 left-0 w-full h-full rounded-lg border border-border"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
