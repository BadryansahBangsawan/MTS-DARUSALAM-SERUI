import { useState } from "react";
import { Code, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface JsonEditorProps {
  value: any;
  onChange: (value: any) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function JsonEditor({ value, onChange, label, placeholder, className }: JsonEditorProps) {
  const [stringValue, setStringValue] = useState(JSON.stringify(value, null, 2));
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setStringValue(newValue);

    try {
      const parsed = JSON.parse(newValue);
      setError("");
      onChange(parsed);
    } catch (err) {
      setError("JSON tidak valid");
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <Code className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
        <textarea
          value={stringValue}
          onChange={handleChange}
          placeholder={placeholder || '[{"key": "value"}]'}
          rows={10}
          className={cn(
            "w-full h-auto px-3 py-2 pl-10 text-xs font-mono border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500",
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
      <p className="text-xs text-gray-500">
        Format JSON array atau object
      </p>
    </div>
  );
}
