import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { RangeSlider } from "@/components/ui/range-slider";

interface RangeFilterProps {
  title: string;
  min: number;
  max: number;
  step: number;
  currentMin?: number;
  currentMax?: number;
  unit?: string;
  onValueChange: (min: number | undefined, max: number | undefined) => void;
}

export function RangeFilter({
  title,
  min,
  max,
  step,
  currentMin,
  currentMax,
  unit = "",
  onValueChange,
}: RangeFilterProps) {
  const hasSelection = currentMin !== undefined || currentMax !== undefined;

  const handleReset = () => {
    onValueChange(undefined, undefined);
  };

  const handleRangeChange = (min: number, max: number) => {
    onValueChange(
      min !== min ? min : undefined,
      max !== max ? max : undefined
    );
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{title}</span>
        {hasSelection && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleReset}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <RangeSlider
        title={title}
        min={min}
        max={max}
        step={step}
        currentMin={currentMin}
        currentMax={currentMax}
        unit={unit}
        onValueChange={handleRangeChange}
      />
    </div>
  );
}