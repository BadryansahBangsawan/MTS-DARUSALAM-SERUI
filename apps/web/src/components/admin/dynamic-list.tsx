import { Plus, Trash2, GripVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DynamicListProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  renderItem?: (item: string, index: number) => React.ReactNode;
}

export function DynamicList({ value = [], onChange, placeholder = "Tambah item...", className, renderItem }: DynamicListProps) {
  const [items, setItems] = useState<string[]>(value);

  useEffect(() => {
    setItems(value);
  }, [value]);

  const handleAdd = () => {
    const newItems = [...items, ""];
    setItems(newItems);
    onChange(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  };

  const handleChange = (index: number, newValue: string) => {
    const newItems = [...items];
    newItems[index] = newValue;
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-3 group">
          <GripVertical className="h-5 w-5 text-slate-300 flex-shrink-0 cursor-move hover:text-slate-400 transition-colors" />
          {renderItem ? (
            <div className="flex-1">{renderItem(item, index)}</div>
          ) : (
            <input
              type="text"
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              className="flex-1 h-10 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          )}
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center space-x-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 px-4 py-2.5 rounded-xl hover:bg-emerald-50 transition-all duration-200 group"
      >
        <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
        <span>Tambah Item</span>
      </button>
    </div>
  );
}
