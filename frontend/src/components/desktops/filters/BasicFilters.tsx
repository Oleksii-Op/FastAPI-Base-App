import { CheckboxFilter } from "@/components/laptops/filters/CheckboxFilter";
import { SelectFilter } from "@/components/laptops/filters/SelectFilter";
import { RangeFilter } from "@/components/laptops/filters/RangeFilter";
import { DesktopFilterParams, DesktopUniqueAttributes } from "@/types/desktop-filters";

interface BasicFiltersProps {
  uniqueAttrs: DesktopUniqueAttributes;
  filters: DesktopFilterParams;
  updateFilter: (key: keyof DesktopFilterParams, value: any) => void;
}

export function BasicFilters({ uniqueAttrs, filters, updateFilter }: BasicFiltersProps) {
  return (
    <div className="space-y-6">
      <RangeFilter
        title="Price"
        min={uniqueAttrs.price_range.min}
        max={uniqueAttrs.price_range.max}
        step={50}
        currentMin={filters.price_min}
        currentMax={filters.price_max}
        unit="$"
        onValueChange={(min, max) => {
          updateFilter("price_min", min);
          updateFilter("price_max", max);
        }}
      />

      <SelectFilter
        title="Manufacturer"
        options={uniqueAttrs.makers}
        value={filters.maker}
        placeholder="Select manufacturer"
        onValueChange={(value) => updateFilter("maker", value)}
      />

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Type</h3>
        <div className="space-y-2">
          <CheckboxFilter
            id="gaming"
            label="Gaming"
            checked={filters.is_for_gaming}
            onCheckedChange={(checked) => updateFilter("is_for_gaming", checked ? true : undefined)}
          />
          <CheckboxFilter
            id="home"
            label="Home/Studying"
            checked={filters.is_for_home_studying}
            onCheckedChange={(checked) => updateFilter("is_for_home_studying", checked ? true : undefined)}
          />
          <CheckboxFilter
            id="office"
            label="Office"
            checked={filters.is_for_office}
            onCheckedChange={(checked) => updateFilter("is_for_office", checked ? true : undefined)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Features</h3>
        <div className="space-y-2">
          <CheckboxFilter
            id="screen"
            label="Includes Screen"
            checked={filters.has_screen}
            onCheckedChange={(checked) => updateFilter("has_screen", checked ? true : undefined)}
          />
          <CheckboxFilter
            id="mini"
            label="Mini PC"
            checked={filters.is_mini}
            onCheckedChange={(checked) => updateFilter("is_mini", checked ? true : undefined)}
          />
        </div>
      </div>
    </div>
  );
}