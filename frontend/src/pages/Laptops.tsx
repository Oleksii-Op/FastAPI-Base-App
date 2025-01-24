import { useState } from "react";
import { LaptopCard } from "@/components/LaptopCard";
import { LaptopFilters } from "@/components/laptops/LaptopFilters";
import { ProductLayout } from "@/components/shared/ProductLayout";
import { ProductListHeader } from "@/components/shared/ProductListHeader";
import { ProductFilterLayout } from "@/components/shared/ProductFilterLayout";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { LaptopFilterParams } from "@/types/filters";
import { useProductQuery } from "@/hooks/use-product-query";
import { LaptopPreview } from "@/types/laptop";

export default function Laptops() {
  const [filters, setFilters] = useState<LaptopFilterParams>({});

  const { 
    items: laptops, 
    isLoading, 
    isFetching, 
    loadMore, 
    showLoadMore 
  } = useProductQuery<LaptopPreview, LaptopFilterParams>({
    queryKey: 'laptops',
    fetchUrl: '/api/v1/laptops/get-laptops-filtered/',
    filters
  });

  return (
    <ProductLayout title="Our Laptops">
      <ProductListHeader title="Our Laptops" />
      <ProductFilterLayout filterComponent={
        <LaptopFilters filters={filters} onFilterChange={setFilters} />
      }>
        <ProductGrid
          isLoading={isLoading}
          showLoadMore={showLoadMore}
          onLoadMore={loadMore}
          isFetching={isFetching}
        >
          {laptops?.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </ProductGrid>
      </ProductFilterLayout>
    </ProductLayout>
  );
}