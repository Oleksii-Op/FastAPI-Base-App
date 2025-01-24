import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterHeaderProps {
  onReset: () => void;
}

export function FilterHeader({ onReset }: FilterHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-white/60">Active filters</span>
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
}