import { SelectFilter } from "@/components/laptops/filters/SelectFilter";
import { RangeFilter } from "@/components/laptops/filters/RangeFilter";
import { AccordionContent } from "@/components/ui/accordion";

interface DisplayFiltersProps {
  uniqueAttrs: {
    resolutions: string[];
    panel_types: string[];
    contrast_ratios: string[];
    aspect_ratios: string[];
    diagonal_range: { min: number; max: number };
    brightness_range: { min: number; max: number };
    response_time_range: { min: number; max: number };
    refresh_rate_range: { min: number; max: number };
  };
  filters: any;
  updateFilter: (key: string, value: any) => void;
}

export function DisplayFilters({ uniqueAttrs, filters, updateFilter }: DisplayFiltersProps) {
  return (
    <AccordionContent className="space-y-4">
      <RangeFilter
        title="Screen Size"
        min={uniqueAttrs.diagonal_range.min}
        max={uniqueAttrs.diagonal_range.max}
        step={0.1}
        currentMin={filters.diagonal_min}
        currentMax={filters.diagonal_max}
        unit='"'
        onValueChange={(min, max) => {
          updateFilter("diagonal_min", min);
          updateFilter("diagonal_max", max);
        }}
      />
      <SelectFilter
        title="Resolution"
        options={uniqueAttrs.resolutions}
        value={filters.resolution}
        placeholder="Select resolution"
        onValueChange={(value) => updateFilter("resolution", value)}
      />
      <SelectFilter
        title="Panel Type"
        options={uniqueAttrs.panel_types}
        value={filters.panel_type}
        placeholder="Select panel type"
        onValueChange={(value) => updateFilter("panel_type", value)}
      />
      <RangeFilter
        title="Brightness (nits)"
        min={uniqueAttrs.brightness_range.min}
        max={uniqueAttrs.brightness_range.max}
        step={50}
        currentMin={filters.brightness_min}
        currentMax={filters.brightness_max}
        onValueChange={(min, max) => {
          updateFilter("brightness_min", min);
          updateFilter("brightness_max", max);
        }}
      />
      <RangeFilter
        title="Response Time (ms)"
        min={uniqueAttrs.response_time_range.min}
        max={uniqueAttrs.response_time_range.max}
        step={1}
        currentMin={filters.response_time_min}
        currentMax={filters.response_time_max}
        unit="ms"
        onValueChange={(min, max) => {
          updateFilter("response_time_min", min);
          updateFilter("response_time_max", max);
        }}
      />
      <RangeFilter
        title="Refresh Rate (Hz)"
        min={uniqueAttrs.refresh_rate_range.min}
        max={uniqueAttrs.refresh_rate_range.max}
        step={1}
        currentMin={filters.refresh_rate_min}
        currentMax={filters.refresh_rate_max}
        unit="Hz"
        onValueChange={(min, max) => {
          updateFilter("refresh_rate_min", min);
          updateFilter("refresh_rate_max", max);
        }}
      />
      <SelectFilter
        title="Contrast Ratio"
        options={uniqueAttrs.contrast_ratios}
        value={filters.contrast_ratio}
        placeholder="Select contrast ratio"
        onValueChange={(value) => updateFilter("contrast_ratio", value)}
      />
      <SelectFilter
        title="Aspect Ratio"
        options={uniqueAttrs.aspect_ratios}
        value={filters.aspect_ratio}
        placeholder="Select aspect ratio"
        onValueChange={(value) => updateFilter("aspect_ratio", value)}
      />
    </AccordionContent>
  );
}