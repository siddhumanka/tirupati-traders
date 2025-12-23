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

// Only allow <option> as children of <select>
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

// Remove or comment out custom trigger/value/content to avoid invalid nesting
// const SelectTrigger = ...
// const SelectValue = ...
// const SelectContent = ...

export { Select, SelectItem };
