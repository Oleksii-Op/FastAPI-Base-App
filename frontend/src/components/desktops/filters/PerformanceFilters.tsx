import { SelectFilter } from "@/components/laptops/filters/SelectFilter";
import { DesktopFilterParams, DesktopUniqueAttributes } from "@/types/desktop-filters";

interface PerformanceFiltersProps {
  uniqueAttrs: DesktopUniqueAttributes;
  filters: DesktopFilterParams;
  updateFilter: (key: keyof DesktopFilterParams, value: any) => void;
}

export function PerformanceFilters({ uniqueAttrs, filters, updateFilter }: PerformanceFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">CPU</h3>
        <SelectFilter
          title="CPU Manufacturer"
          options={uniqueAttrs.cpu_makers}
          value={filters.cpu_maker}
          placeholder="Select CPU maker"
          onValueChange={(value) => updateFilter("cpu_maker", value)}
        />
        <SelectFilter
          title="CPU Class"
          options={uniqueAttrs.cpu_models}
          value={filters.cpu_class}
          placeholder="Select CPU class"
          onValueChange={(value) => updateFilter("cpu_class", value)}
        />
        <SelectFilter
          title="CPU Cores"
          options={uniqueAttrs.cpu_cores.map(String)}
          value={filters.cpu_cores?.map(String)}
          placeholder="Select core count"
          onValueChange={(value) => updateFilter("cpu_cores", value ? value.map(v => parseInt(v)) : undefined)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">GPU</h3>
        <SelectFilter
          title="GPU Manufacturer"
          options={uniqueAttrs.gpu_makers}
          value={filters.gpu_maker}
          placeholder="Select GPU maker"
          onValueChange={(value) => updateFilter("gpu_maker", value)}
        />
        <SelectFilter
          title="GPU Model"
          options={uniqueAttrs.gpu_models}
          value={filters.gpu_model}
          placeholder="Select GPU model"
          onValueChange={(value) => updateFilter("gpu_model", value)}
        />
        <SelectFilter
          title="GPU Memory"
          options={uniqueAttrs.gpu_memories.filter((m): m is number => m !== null).map(String)}
          value={filters.gpu_memory?.map(String)}
          placeholder="Select GPU memory"
          formatOption={(option) => `${option}GB`}
          onValueChange={(value) => updateFilter("gpu_memory", value ? value.map(v => parseInt(v)) : undefined)}
        />
      </div>
    </div>
  );
}