import * as React from "react";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
    {
        variants: {
            variant: {
                default: "bg-blue-600 text-white",
                secondary: "bg-slate-200 text-slate-700",
                outline: "border border-slate-300 text-slate-700",
            },
        },
        defaultVariants: { variant: "default" },
    }
);

export function Badge({ className, variant, ...props }) {
    return <div className={badgeVariants({ variant, className })} {...props} />;
}