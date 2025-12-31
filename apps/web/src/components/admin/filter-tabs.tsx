import { cn } from "@/lib/utils";

interface FilterTab {
  id: string;
  label: string;
  count?: number;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function FilterTabs({ tabs, activeTab, onTabChange, className }: FilterTabsProps) {
  return (
    <div className={cn("flex space-x-1 border-b border-border overflow-x-auto", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
            activeTab === tab.id
              ? "border-green-500 text-green-700"
              : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
