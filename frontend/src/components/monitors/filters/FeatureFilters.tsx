import { Checkbox } from "@/components/ui/checkbox";
import { SelectFilter } from "@/components/laptops/filters/SelectFilter";
import { AccordionContent } from "@/components/ui/accordion";

interface FeatureFiltersProps {
  uniqueAttrs: {
    vesa_mountings: string[];
  };
  filters: any;
  updateFilter: (key: string, value: any) => void;
}

export const FeatureFilters = ({ uniqueAttrs, filters, updateFilter }: FeatureFiltersProps) => {
  return (
    <AccordionContent className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white flex items-center space-x-2">
          <Checkbox
            checked={filters.has_touchscreen === true}
            onCheckedChange={(checked) =>
              updateFilter("has_touchscreen", checked ? true : undefined)
            }
            className="border-white/20"
          />
          <span>Touchscreen</span>
        </label>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-white flex items-center space-x-2">
          <Checkbox
            checked={filters.pivot === true}
            onCheckedChange={(checked) =>
              updateFilter("pivot", checked ? true : undefined)
            }
            className="border-white/20"
          />
          <span>Pivot Support</span>
        </label>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-white flex items-center space-x-2">
          <Checkbox
            checked={filters.is_adjustable_height === true}
            onCheckedChange={(checked) =>
              updateFilter("is_adjustable_height", checked ? true : undefined)
            }
            className="border-white/20"
          />
          <span>Height Adjustable</span>
        </label>
      </div>
      <SelectFilter
        title="VESA Mount"
        options={uniqueAttrs.vesa_mountings}
        value={filters.vesa_mounting}
        placeholder="Select VESA mount"
        onValueChange={(value) => updateFilter("vesa_mounting", value)}
      />
    </AccordionContent>
  );
};