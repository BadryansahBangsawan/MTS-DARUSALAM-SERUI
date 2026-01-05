import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorOption {
  value: string;
  label: string;
  className: string;
}

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  options?: ColorOption[];
  className?: string;
}

const defaultOptions: ColorOption[] = [
  { value: "green", label: "Hijau", className: "bg-emerald-500" },
  { value: "blue", label: "Biru", className: "bg-blue-500" },
  { value: "red", label: "Merah", className: "bg-red-500" },
  { value: "orange", label: "Orange", className: "bg-orange-500" },
  { value: "purple", label: "Ungu", className: "bg-violet-500" },
  { value: "yellow", label: "Kuning", className: "bg-amber-500" },
  { value: "pink", label: "Pink", className: "bg-pink-500" },
  { value: "gray", label: "Abu-abu", className: "bg-slate-500" },
];

export function ColorPicker({ value, onChange, options = defaultOptions, className }: ColorPickerProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "relative w-11 h-11 rounded-xl border-2 transition-all hover:scale-110 shadow-sm",
            option.className,
            value === option.value
              ? "border-slate-900 scale-110 ring-2 ring-offset-2 ring-slate-900 shadow-lg"
              : "border-transparent hover:border-slate-300"
          )}
          title={option.label}
          aria-label={option.label}
        >
          {value === option.value && (
            <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />
          )}
        </button>
      ))}
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-11 h-11 rounded-xl border-2 border-slate-200 cursor-pointer overflow-hidden hover:border-slate-400 transition-colors"
          title="Warna Custom"
        />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-white/30" />
        </div>
      </div>
    </div>
  );
}
