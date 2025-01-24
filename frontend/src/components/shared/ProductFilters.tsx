import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";

interface ProductFiltersProps {
  title: string;
  children: React.ReactNode;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function ProductFilters({ 
  title, 
  children, 
  hasActiveFilters, 
  onResetFilters 
}: ProductFiltersProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 overflow-hidden">
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="p-4">
          {hasActiveFilters && (
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-white/60">Active filters</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Reset all
              </Button>
            </div>
          )}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {children}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}