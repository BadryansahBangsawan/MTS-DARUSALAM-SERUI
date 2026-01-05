import { useState } from "react";
import { X, Loader2, AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  loading = false,
  variant = "danger",
}: ConfirmDialogProps) {
  if (!open) return null;

  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
    }
  };

  const variantStyles = {
    danger: {
      bgClass: "from-red-500 to-rose-600",
      hoverClass: "hover:from-red-600 hover:to-rose-700",
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    warning: {
      bgClass: "from-amber-500 to-orange-600",
      hoverClass: "hover:from-amber-600 hover:to-orange-700",
      icon: AlertCircle,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    info: {
      bgClass: "from-blue-500 to-cyan-600",
      hoverClass: "hover:from-blue-600 hover:to-cyan-700",
      icon: Info,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  };

  const styles = variantStyles[variant];
  const Icon = styles.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={loading ? undefined : onClose} />
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full border border-slate-200/60 animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className={`w-14 h-14 ${styles.iconBg} rounded-2xl flex items-center justify-center`}>
              <Icon className={`h-7 w-7 ${styles.iconColor}`} />
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <X className="h-5 w-5 text-slate-400 group-hover:text-slate-600" />
            </button>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-3">
            {title}
          </h3>

          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:bg-slate-50"
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              className={cn("bg-gradient-to-r", styles.bgClass, styles.hoverClass, "shadow-lg shadow-red-500/30")}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
