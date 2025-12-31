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
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <GripVertical className="h-5 w-5 text-gray-300 flex-shrink-0 cursor-move" />
          {renderItem ? (
            <div className="flex-1">{renderItem(item, index)}</div>
          ) : (
            <input
              type="text"
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              className="flex-1 h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          )}
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center space-x-2 text-xs text-green-600 hover:text-green-700 px-3 py-2 rounded-md hover:bg-green-50 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Tambah Item</span>
      </button>
    </div>
  );
}
