import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingPickerProps {
  value: number;
  onChange: (value: number) => void;
  readonly?: boolean;
  className?: string;
}

export function RatingPicker({ value, onChange, readonly = false, className }: RatingPickerProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange(star)}
          disabled={readonly}
          className={cn(
            "transition-colors focus:outline-none",
            readonly && "cursor-default"
          )}
        >
          <Star
            className={cn(
              "h-5 w-5",
              star <= value ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
            )}
          />
        </button>
      ))}
      <span className="ml-2 text-xs text-gray-600">
        {value} dari 5
      </span>
    </div>
  );
}
