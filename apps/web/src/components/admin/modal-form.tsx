import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function ModalForm({
  open,
  onClose,
  title,
  children,
  footer,
  loading = false,
  size = "lg",
}: ModalFormProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={loading ? undefined : onClose} />
      <div className={cn("relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full border border-slate-200/60 animate-in fade-in zoom-in duration-200", sizeClasses[size])}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white rounded-t-3xl">
          <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <X className="h-5 w-5 text-slate-400 group-hover:text-slate-600" />
          </button>
        </div>

        <form className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar" onSubmit={(e) => e.preventDefault()}>
          {children}
        </form>

        {footer && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
