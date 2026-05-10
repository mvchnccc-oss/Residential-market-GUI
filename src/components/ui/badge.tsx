import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline:
          "border-border text-foreground bg-transparent",
        success:
          "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
        warning:
          "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
        danger:
          "border-transparent bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
        info:
          "border-transparent bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
        featured:
          "border-transparent bg-amber-500 text-white",
        new:
          "border-transparent bg-emerald-500 text-white",
        hot:
          "border-transparent bg-rose-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
