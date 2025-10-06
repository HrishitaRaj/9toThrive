import { ReactNode } from "react";

interface FilterBarProps {
  children: ReactNode;
}

export const FilterBar = ({ children }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border border-border shadow-sm">
      {children}
    </div>
  );
};
