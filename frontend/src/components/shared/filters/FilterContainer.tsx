import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import { FilterHeader } from "./FilterHeader";

interface FilterContainerProps {
  children: React.ReactNode;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function FilterContainer({ children, hasActiveFilters, onReset }: FilterContainerProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 overflow-hidden">
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="p-4">
          {hasActiveFilters && <FilterHeader onReset={onReset} />}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {children}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}