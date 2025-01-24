import { SelectFilter } from "@/components/laptops/filters/SelectFilter";
import { DesktopFilterParams, DesktopUniqueAttributes } from "@/types/desktop-filters";

interface MemoryFiltersProps {
  uniqueAttrs: DesktopUniqueAttributes;
  filters: DesktopFilterParams;
  updateFilter: (key: keyof DesktopFilterParams, value: any) => void;
}

export function MemoryFilters({ uniqueAttrs, filters, updateFilter }: MemoryFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">RAM</h3>
        <SelectFilter
          title="RAM Type"
          options={uniqueAttrs.ram_types}
          value={filters.ram_type}
          placeholder="Select RAM type"
          onValueChange={(value) => updateFilter("ram_type", value)}
        />
        <SelectFilter
          title="RAM Frequency"
          options={uniqueAttrs.ram_frequency.map(String)}
          value={filters.ram_frequency?.map(String)}
          placeholder="Select RAM frequency"
          formatOption={(option) => `${option}MHz`}
          onValueChange={(value) => updateFilter("ram_frequency", value ? value.map(v => parseInt(v)) : undefined)}
        />
        <SelectFilter
          title="RAM Size"
          options={uniqueAttrs.ram_sizes.map(String)}
          value={filters.ram_size?.map(String)}
          placeholder="Select RAM size"
          formatOption={(option) => `${option}GB`}
          onValueChange={(value) => updateFilter("ram_size", value ? value.map(v => parseInt(v)) : undefined)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Storage</h3>
        <SelectFilter
          title="Storage Type"
          options={uniqueAttrs.storage_types}
          value={filters.storage_type}
          placeholder="Select storage type"
          onValueChange={(value) => updateFilter("storage_type", value)}
        />
        <SelectFilter
          title="Storage Size"
          options={uniqueAttrs.storage_sizes.map(String)}
          value={filters.storage_size?.map(String)}
          placeholder="Select storage size"
          formatOption={(option) => `${option}GB`}
          onValueChange={(value) => updateFilter("storage_size", value ? value.map(v => parseInt(v)) : undefined)}
        />
      </div>
    </div>
  );
}