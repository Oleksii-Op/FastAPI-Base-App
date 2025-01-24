import { Button } from "@/components/ui/button";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductListHeaderProps {
  title: string;
  onToggleFilters?: () => void;
  showFilterToggle?: boolean;
}

export function ProductListHeader({ 
  title, 
  onToggleFilters, 
  showFilterToggle = true 
}: ProductListHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        {showFilterToggle && (
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleFilters}
            className="lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Main Page
      </Button>
    </div>
  );
}