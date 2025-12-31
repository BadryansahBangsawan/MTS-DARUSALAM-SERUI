import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  className?: string;
}

export function MultiSelect({ options, value = [], onChange, label, className }: MultiSelectProps) {
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleToggleAll = () => {
    if (value.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map((o) => o.value));
    }
  };

  const isAllSelected = value.length === options.length;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <button
          type="button"
          onClick={handleToggleAll}
          className="text-xs text-green-600 hover:text-green-700 font-medium"
        >
          {isAllSelected ? "Batal Pilih Semua" : "Pilih Semua"}
        </button>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer group">
            <Checkbox
              checked={value.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
              id={`multiselect-${option.value}`}
            />
            <span className="text-xs text-gray-700 group-hover:text-gray-900">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {value.length > 0 && (
        <p className="text-xs text-gray-500">
          {value.length} dipilih
        </p>
      )}
    </div>
  );
}
