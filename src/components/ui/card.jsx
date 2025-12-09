import * as React from "react";

const Card = React.forwardRef(({ className = "", ...props }, ref) => (
    <div ref={ref} className={`rounded-2xl border bg-white shadow-sm ${className}`} {...props} />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className = "", ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardContent };