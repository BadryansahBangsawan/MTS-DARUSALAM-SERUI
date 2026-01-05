import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm",
  {
    variants: {
      variant: {
        pending: "bg-amber-100 text-amber-700 border border-amber-200/60",
        approved: "bg-emerald-100 text-emerald-700 border border-emerald-200/60",
        rejected: "bg-red-100 text-red-700 border border-red-200/60",
        featured: "bg-violet-100 text-violet-700 border border-violet-200/60",
        active: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
        inactive: "bg-slate-100 text-slate-600 border border-slate-200/60",
        religious: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
        language: "bg-cyan-50 text-cyan-700 border border-cyan-200/60",
        science: "bg-indigo-50 text-indigo-700 border border-indigo-200/60",
        social: "bg-orange-50 text-orange-700 border border-orange-200/60",
        skills: "bg-pink-50 text-pink-700 border border-pink-200/60",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
