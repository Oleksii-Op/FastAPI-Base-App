import { useQuery } from "@tanstack/react-query";
import { AccordionContent } from "@/components/ui/accordion";
import { DesktopFilterParams, DesktopUniqueAttributes } from "@/types/desktop-filters";
import { BasicFilters } from "./filters/BasicFilters";
import { PerformanceFilters } from "./filters/PerformanceFilters";
import { MemoryFilters } from "./filters/MemoryFilters";
import { FilterContainer } from "../shared/filters/FilterContainer";
import { FilterAccordion } from "../shared/filters/FilterAccordion";

interface DesktopFiltersProps {
  filters: DesktopFilterParams;
  onFilterChange: (filters: DesktopFilterParams) => void;
}

export function DesktopFilters({ filters, onFilterChange }: DesktopFiltersProps) {
  const { data: uniqueAttrs, isError } = useQuery({
    queryKey: ["desktop-attributes"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/desktops/get-unique-attrs`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch attributes");
      }
      return response.json();
    },
  });

  if (isError) {
    console.error("Error loading filters");
    return null;
  }

  if (!uniqueAttrs) {
    return null;
  }

  const updateFilter = <K extends keyof DesktopFilterParams>(
    key: K,
    value: DesktopFilterParams[K] | undefined
  ) => {
    const newFilters = { ...filters };
    if (value === undefined) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFilterChange(newFilters);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <FilterContainer hasActiveFilters={hasActiveFilters} onReset={() => onFilterChange({})}>
      <FilterAccordion value="basic" title="Basic Information">
        <AccordionContent>
          <BasicFilters
            uniqueAttrs={uniqueAttrs}
            filters={filters}
            updateFilter={updateFilter}
          />
        </AccordionContent>
      </FilterAccordion>

      <FilterAccordion value="performance" title="Performance">
        <AccordionContent>
          <PerformanceFilters
            uniqueAttrs={uniqueAttrs}
            filters={filters}
            updateFilter={updateFilter}
          />
        </AccordionContent>
      </FilterAccordion>

      <FilterAccordion value="memory" title="Memory & Storage">
        <AccordionContent>
          <MemoryFilters
            uniqueAttrs={uniqueAttrs}
            filters={filters}
            updateFilter={updateFilter}
          />
        </AccordionContent>
      </FilterAccordion>
    </FilterContainer>
  );
}