import { cn } from "@/lib/utils";

interface StatusToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function StatusToggle({ checked, onChange, label, disabled = false, className }: StatusToggleProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
          checked ? "bg-green-500" : "bg-gray-200",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        role="switch"
        aria-checked={checked}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
      {label && (
        <span className="text-xs text-gray-700">
          {checked ? "Aktif" : "Tidak Aktif"}
        </span>
      )}
    </div>
  );
}
