import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActiveFiltersProps {
  filters: Record<string, any>;
  onReset: () => void;
}

export const ActiveFilters = ({ filters, onReset }: ActiveFiltersProps) => {
  const hasActiveFilters = Object.keys(filters).length > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-muted-foreground">Active filters</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="h-8 px-2 text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4 mr-2" />
        Reset all
      </Button>
    </div>
  );
};