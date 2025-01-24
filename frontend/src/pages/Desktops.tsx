import { useState } from "react";
import { DesktopCard } from "@/components/DesktopCard";
import { DesktopFilters } from "@/components/desktops/DesktopFilters";
import { ProductLayout } from "@/components/shared/ProductLayout";
import { ProductListHeader } from "@/components/shared/ProductListHeader";
import { ProductFilterLayout } from "@/components/shared/ProductFilterLayout";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { useProductQuery } from "@/hooks/use-product-query";
import { DesktopPreview } from "@/types/desktop";
import { DesktopFilterParams } from "@/types/desktop-filters";

export default function Desktops() {
  const [filters, setFilters] = useState<DesktopFilterParams>({});

  const { 
    items: desktops, 
    isLoading, 
    isFetching, 
    loadMore, 
    showLoadMore 
  } = useProductQuery<DesktopPreview, DesktopFilterParams>({
    queryKey: 'desktops',
    fetchUrl: '/api/v1/desktops/get-desktops-filtered/',
    filters
  });

  return (
    <ProductLayout title="Our Desktops">
      <ProductListHeader title="Our Desktops" />
      <ProductFilterLayout filterComponent={
        <DesktopFilters filters={filters} onFilterChange={setFilters} />
      }>
        <ProductGrid
          isLoading={isLoading}
          showLoadMore={showLoadMore}
          onLoadMore={loadMore}
          isFetching={isFetching}
        >
          {desktops?.map((desktop) => (
            <DesktopCard key={desktop.id} desktop={desktop} />
          ))}
        </ProductGrid>
      </ProductFilterLayout>
    </ProductLayout>
  );
}