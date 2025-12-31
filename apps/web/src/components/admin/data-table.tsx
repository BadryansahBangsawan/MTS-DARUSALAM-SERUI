import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  emptyState?: {
    title: string;
    description?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  searchQuery = "",
  onSearchChange,
  searchPlaceholder = "Cari...",
  pagination,
  emptyState,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  if (loading) {
    return (
      <div className={cn("bg-white rounded-lg shadow-sm p-8", className)}>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        </div>
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return (
      <div className={cn("bg-white rounded-lg shadow-sm", className)}>
        {onSearchChange && (
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
        )}
        <div className="p-8 text-center">
          <p className="text-sm text-gray-900 mb-2">{emptyState.title}</p>
          {emptyState.description && (
            <p className="text-xs text-gray-500 mb-4">{emptyState.description}</p>
          )}
          {emptyState.action && (
            <button
              type="button"
              onClick={emptyState.action.onClick}
              className="px-4 py-2 bg-green-500 text-white text-xs font-medium rounded-md hover:bg-green-600 transition-colors"
            >
              {emptyState.action.label}
            </button>
          )}
        </div>
      </div>
    );
  }

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    const key = column.key as string;
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (column: Column<T>) => {
    if (sortKey !== column.key) return null;
    return sortDirection === "asc" ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />;
  };

  const getCellValue = (row: any, column: Column<T>, index: number) => {
    if (column.render) {
      return column.render(
        typeof column.key === "string" && column.key in row
          ? row[column.key]
          : undefined,
        row,
        index
      );
    }
    if (typeof column.key === "string" && column.key in row) {
      return row[column.key]?.toString() || "-";
    }
    return "-";
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm", className)}>
      {onSearchChange && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  onClick={() => handleSort(column)}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 select-none",
                    column.sortable && "hover:text-gray-900",
                    column.className
                  )}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-border hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className={cn("px-4 py-3 text-xs text-gray-700", column.className)}
                  >
                    {getCellValue(row as any, column, index)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="px-4 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Halaman {pagination.currentPage} dari {pagination.totalPages}
          </p>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-1.5 rounded-md border border-input hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-1.5 rounded-md border border-input hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
