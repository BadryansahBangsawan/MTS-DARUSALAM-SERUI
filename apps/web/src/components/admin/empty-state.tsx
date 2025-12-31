import { cn } from "@/lib/utils";
import { FileX, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  const defaultIcon = <FileX className="h-12 w-12 text-gray-300" />;

  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="mb-4">
        {icon || defaultIcon}
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-gray-500 max-w-sm mb-4">
          {description}
        </p>
      )}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="inline-flex items-center px-4 py-2 bg-green-500 text-white text-xs font-medium rounded-md hover:bg-green-600 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          {action.label}
        </button>
      )}
    </div>
  );
}
