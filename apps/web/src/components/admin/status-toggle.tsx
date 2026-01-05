import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface StatusToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function StatusToggle({ checked, onChange, label, disabled = false, className }: StatusToggleProps) {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-sm",
          checked ? "bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-500" : "bg-slate-200 border-slate-200",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        role="switch"
        aria-checked={checked}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out flex items-center justify-center",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        >
          {checked && <Check className="h-3 w-3 text-emerald-500" />}
        </span>
      </button>
      {label && (
        <span className={cn("text-sm font-medium transition-colors", checked ? "text-emerald-600" : "text-slate-500")}>
          {checked ? "Aktif" : "Tidak Aktif"}
        </span>
      )}
    </div>
  );
}
