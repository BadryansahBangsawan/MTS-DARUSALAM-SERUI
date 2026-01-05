import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, Loader2, FileX, Filter } from "lucide-react";
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
      <div className={cn("bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm p-12", className)}>
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
          <p className="mt-4 text-slate-500 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return (
      <div className={cn("bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm", className)}>
        {onSearchChange && (
          <div className="p-4 border-b border-slate-200/60">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-11 pr-4 h-10 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>
        )}
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileX className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-900 mb-2">{emptyState.title}</p>
          {emptyState.description && (
            <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">{emptyState.description}</p>
          )}
          {emptyState.action && (
            <button
              type="button"
              onClick={emptyState.action.onClick}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/30"
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
    return sortDirection === "asc" ? <ChevronRight className="h-3 w-3 text-emerald-500" /> : <ChevronLeft className="h-3 w-3 text-emerald-500" />;
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
    <div className={cn("bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden", className)}>
      {onSearchChange && (
        <div className="p-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-11 pr-4 h-10 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
            <button className="p-2.5 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
              <Filter className="h-4 w-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200/60 bg-slate-50/50">
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  onClick={() => handleSort(column)}
                  className={cn(
                    "px-6 py-4 text-left text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-100/50 select-none transition-colors",
                    column.sortable && "hover:text-slate-900",
                    column.className
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-slate-200/60 hover:bg-slate-50/50 transition-colors">
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className={cn("px-6 py-4 text-sm text-slate-700", column.className)}
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
        <div className="px-6 py-4 border-t border-slate-200/60 flex items-center justify-between bg-slate-50/30">
          <p className="text-sm text-slate-500">
            Halaman <span className="font-semibold text-slate-900">{pagination.currentPage}</span> dari{" "}
            <span className="font-semibold text-slate-900">{pagination.totalPages}</span>
          </p>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-2 rounded-xl border border-slate-200/60 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="h-4 w-4 text-slate-600" />
            </button>
            <button
              type="button"
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-2 rounded-xl border border-slate-200/60 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="h-4 w-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
