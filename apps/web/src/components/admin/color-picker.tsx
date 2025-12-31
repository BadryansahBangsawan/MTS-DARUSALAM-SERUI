import { cn } from "@/lib/utils";

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
  { value: "green", label: "Hijau", className: "bg-green-500" },
  { value: "blue", label: "Biru", className: "bg-blue-500" },
  { value: "red", label: "Merah", className: "bg-red-500" },
  { value: "orange", label: "Orange", className: "bg-orange-500" },
  { value: "purple", label: "Ungu", className: "bg-purple-500" },
  { value: "yellow", label: "Kuning", className: "bg-yellow-500" },
  { value: "pink", label: "Pink", className: "bg-pink-500" },
  { value: "gray", label: "Abu-abu", className: "bg-gray-500" },
];

export function ColorPicker({ value, onChange, options = defaultOptions, className }: ColorPickerProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "w-10 h-10 rounded-full border-2 transition-all hover:scale-110",
            option.className,
            value === option.value
              ? "border-gray-900 scale-110 ring-2 ring-offset-2 ring-green-500"
              : "border-transparent hover:border-gray-300"
          )}
          title={option.label}
          aria-label={option.label}
        />
      ))}
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer overflow-hidden"
        title="Warna Custom"
      />
    </div>
  );
}
