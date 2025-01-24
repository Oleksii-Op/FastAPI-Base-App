import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface ProductFilterLayoutProps {
  children: React.ReactNode;
  filterComponent: React.ReactNode;
}

export function ProductFilterLayout({ children, filterComponent }: ProductFilterLayoutProps) {
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  return (
    <div className="flex gap-8 relative">
      {/* Desktop Filters */}
      <div 
        className={`hidden lg:block w-[300px] bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 transition-all duration-300 ${
          isFilterVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="text-white hover:text-white/80"
          >
            {isFilterVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {filterComponent}
      </div>

      {/* Show Filters Button when hidden */}
      {!isFilterVisible && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterVisible(true)}
          className="hidden lg:flex fixed left-4 top-24 z-50 gap-2 bg-white/10 backdrop-blur-lg border border-white/20"
        >
          <Eye className="h-4 w-4" />
          Show Filters
        </Button>
      )}

      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 bg-white/10 backdrop-blur-lg border border-white/20"
          >
            <SlidersHorizontal className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-gray-900/95 border-white/10">
          {filterComponent}
        </SheetContent>
      </Sheet>

      <div className={`flex-1 transition-all duration-300 ${!isFilterVisible ? 'lg:ml-0' : ''}`}>
        {children}
      </div>
    </div>
  );
}