import * as React from "react";

const Select = ({ children, value, onValueChange, ...props }) => {
    return (
        <select
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-slate-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...props}
        >
            {children}
        </select>
    );
};

const SelectTrigger = React.forwardRef(({ children, ...props }, ref) => (
    <select ref={ref} {...props} className="w-full h-12 px-4 rounded-lg border border-slate-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
        {children}
    </select>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };