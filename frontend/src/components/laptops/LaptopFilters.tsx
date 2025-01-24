import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { UniqueAttributes, LaptopFilterParams } from "@/types/filters";
import { RangeFilter } from "./filters/RangeFilter";
import { SelectFilter } from "./filters/SelectFilter";
import { CheckboxFilter } from "./filters/CheckboxFilter";
import { X } from "lucide-react";

interface LaptopFiltersProps {
  filters: LaptopFilterParams;
  onFilterChange: (filters: LaptopFilterParams) => void;
}

export function LaptopFilters({ filters, onFilterChange }: LaptopFiltersProps) {
  const { data: uniqueAttrs } = useQuery<UniqueAttributes>({
    queryKey: ["laptop-attributes"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/laptops/get-unique-attrs`
      );
      if (!response.ok) throw new Error("Failed to fetch attributes");
      return response.json();
    },
  });

  if (!uniqueAttrs) return null;

  const updateFilter = <K extends keyof LaptopFilterParams>(
    key: K,
    value: LaptopFilterParams[K] | undefined
  ) => {
    const newFilters = { ...filters };
    
    if (value === undefined) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <ScrollArea className="h-[calc(100vh-6rem)] px-4">
      <div className="space-y-4">
        {hasActiveFilters && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">Active filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-2" />
              Reset all
            </Button>
          </div>
        )}
        
        <Accordion type="single" collapsible className="w-full">
          {/* Price Range */}
          <AccordionItem value="price">
            <AccordionTrigger className="text-white hover:text-white/80">Price range</AccordionTrigger>
            <AccordionContent>
              <RangeFilter
                title="Price"
                min={uniqueAttrs.price_range.min}
                max={uniqueAttrs.price_range.max}
                step={100}
                currentMin={filters.price_min}
                currentMax={filters.price_max}
                unit="$"
                onValueChange={(min, max) => {
                  updateFilter("price_min", min);
                  updateFilter("price_max", max);
                }}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Type of Laptop */}
          <AccordionItem value="type">
            <AccordionTrigger className="text-white hover:text-white/80">Type of laptop</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <CheckboxFilter
                  id="gaming"
                  label="Gaming"
                  checked={filters.is_for_gaming}
                  onCheckedChange={(checked) => 
                    updateFilter("is_for_gaming", checked ? true : undefined)
                  }
                />
                <CheckboxFilter
                  id="studying"
                  label="Home/Studying"
                  checked={filters.is_for_home_studying}
                  onCheckedChange={(checked) => 
                    updateFilter("is_for_home_studying", checked ? true : undefined)
                  }
                />
                <CheckboxFilter
                  id="office"
                  label="Office"
                  checked={filters.is_for_office}
                  onCheckedChange={(checked) => 
                    updateFilter("is_for_office", checked ? true : undefined)
                  }
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Diagonal */}
          <AccordionItem value="diagonal">
            <AccordionTrigger className="text-white hover:text-white/80">Diagonal</AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>

          {/* Resolution */}
          <AccordionItem value="resolution">
            <AccordionTrigger className="text-white hover:text-white/80">Resolution</AccordionTrigger>
            <AccordionContent>
              <SelectFilter
                title="Screen Resolution"
                options={uniqueAttrs.resolutions}
                value={filters.resolution}
                placeholder="Select resolution"
                onValueChange={(value) => updateFilter("resolution", value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Panel Type */}
          <AccordionItem value="screen_type">
            <AccordionTrigger className="text-white hover:text-white/80">Panel Type</AccordionTrigger>
            <AccordionContent>
              <SelectFilter
                title="Screen Type"
                options={uniqueAttrs.screen_types}
                value={filters.screen_type}
                placeholder="Select panel type"
                onValueChange={(value) => updateFilter("screen_type", value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Refresh Rate */}
          <AccordionItem value="refresh_rate">
            <AccordionTrigger className="text-white hover:text-white/80">Refresh Rate</AccordionTrigger>
            <AccordionContent>
              <RangeFilter
                title="Screen Frequency"
                min={uniqueAttrs.screen_frequency_range.min}
                max={uniqueAttrs.screen_frequency_range.max}
                step={1}
                currentMin={filters.screen_frequency_min}
                currentMax={filters.screen_frequency_max}
                unit="Hz"
                onValueChange={(min, max) => {
                  updateFilter("screen_frequency_min", min);
                  updateFilter("screen_frequency_max", max);
                }}
              />
            </AccordionContent>
          </AccordionItem>

          {/* CPU Family */}
          <AccordionItem value="cpu_maker">
            <AccordionTrigger className="text-white hover:text-white/80">CPU Family</AccordionTrigger>
            <AccordionContent>
              <SelectFilter
                title="CPU Maker"
                options={uniqueAttrs.cpu_makers}
                value={filters.cpu_maker}
                placeholder="Select CPU maker"
                onValueChange={(value) => updateFilter("cpu_maker", value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* CPU Model */}
          <AccordionItem value="cpu_model">
            <AccordionTrigger className="text-white hover:text-white/80">CPU Model</AccordionTrigger>
            <AccordionContent>
              <SelectFilter
                title="CPU Model"
                options={uniqueAttrs.cpu_models}
                value={filters.cpu_model}
                placeholder="Select CPU model"
                onValueChange={(value) => updateFilter("cpu_model", value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* GPU */}
          <AccordionItem value="gpu">
            <AccordionTrigger className="text-white hover:text-white/80">GPU</AccordionTrigger>
            <AccordionContent>
              <SelectFilter
                title="GPU Maker"
                options={uniqueAttrs.gpu_makers}
                value={filters.gpu_maker}
                placeholder="Select GPU maker"
                onValueChange={(value) => updateFilter("gpu_maker", value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* RAM */}
          <AccordionItem value="ram">
            <AccordionTrigger className="text-white hover:text-white/80">RAM (GB)</AccordionTrigger>
            <AccordionContent>
              <SelectFilter
                title="RAM Size"
                options={uniqueAttrs.ram_sizes}
                value={filters.ram_size?.map(String)}
                placeholder="Select RAM size"
                formatOption={(option) => `${option}GB`}
                onValueChange={(value) => updateFilter("ram_size", value ? value.map(v => parseInt(v)) : undefined)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Operating System */}
          <AccordionItem value="os">
            <AccordionTrigger className="text-white hover:text-white/80">Operation System</AccordionTrigger>
            <AccordionContent>
              <SelectFilter
                title="Operating System"
                options={uniqueAttrs.installed_os}
                value={filters.installed_os}
                placeholder="Select OS"
                onValueChange={(value) => updateFilter("installed_os", value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Storage */}
          <AccordionItem value="storage">
            <AccordionTrigger className="text-white hover:text-white/80">SSD Capacity (GB)</AccordionTrigger>
            <AccordionContent>
              <SelectFilter
                title="Storage Size"
                options={uniqueAttrs.storage_sizes}
                value={filters.storage_size?.map(String)}
                placeholder="Select storage size"
                formatOption={(option) => `${option}GB`}
                onValueChange={(value) => updateFilter("storage_size", value ? value.map(v => parseInt(v)) : undefined)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ScrollArea>
  );
}
