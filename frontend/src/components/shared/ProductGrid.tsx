import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  children: React.ReactNode;
  isLoading: boolean;
  showLoadMore: boolean;
  onLoadMore: () => void;
  isFetching: boolean;
}

export function ProductGrid({ 
  children, 
  isLoading, 
  showLoadMore, 
  onLoadMore, 
  isFetching 
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="text-center text-white">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </div>
      
      {showLoadMore && (
        <div className="mt-8 text-center">
          <Button
            onClick={onLoadMore}
            variant="secondary"
            className="bg-white/10 text-white hover:bg-white/20 transition-colors"
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading more...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}