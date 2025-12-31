import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
  {
    variants: {
      variant: {
        pending: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
        featured: "bg-purple-100 text-purple-800",
        active: "bg-blue-100 text-blue-800",
        inactive: "bg-gray-100 text-gray-800",
        religious: "bg-green-100 text-green-800",
        language: "bg-blue-100 text-blue-800",
        science: "bg-indigo-100 text-indigo-800",
        social: "bg-orange-100 text-orange-800",
        skills: "bg-pink-100 text-pink-800",
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
