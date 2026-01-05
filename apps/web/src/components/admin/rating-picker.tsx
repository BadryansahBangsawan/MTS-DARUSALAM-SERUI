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
            "transition-all duration-200 focus:outline-none group",
            readonly && "cursor-default"
          )}
        >
          <Star
            className={cn(
              "h-6 w-6 transition-all duration-200 group-hover:scale-110",
              star <= value
                ? "fill-amber-400 text-amber-400 drop-shadow-lg"
                : "fill-slate-200 text-slate-200 hover:fill-slate-300 hover:text-slate-300"
            )}
          />
        </button>
      ))}
      <span className="ml-3 text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
        {value} / 5
      </span>
    </div>
  );
}
