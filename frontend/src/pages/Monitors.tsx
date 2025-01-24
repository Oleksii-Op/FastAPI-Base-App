import { useState } from "react";
import { MonitorCard } from "@/components/MonitorCard";
import { MonitorFilters } from "@/components/monitors/MonitorFilters";
import { ProductLayout } from "@/components/shared/ProductLayout";
import { ProductListHeader } from "@/components/shared/ProductListHeader";
import { ProductFilterLayout } from "@/components/shared/ProductFilterLayout";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { useProductQuery } from "@/hooks/use-product-query";
import { MonitorPreview } from "@/types/monitor";

interface MonitorFilterParams {
  maker?: string[];
  resolution?: string[];
  panel_type?: string[];
  price_min?: number;
  price_max?: number;
  diagonal_min?: number;
  diagonal_max?: number;
  hdmi_connection?: number[];
  dp_connection?: number[];
  usb_type_c?: number[];
}

export default function Monitors() {
  const [filters, setFilters] = useState<MonitorFilterParams>({});

  const { 
    items: monitors, 
    isLoading, 
    isFetching, 
    loadMore, 
    showLoadMore 
  } = useProductQuery<MonitorPreview, MonitorFilterParams>({
    queryKey: 'monitors',
    fetchUrl: '/api/v1/monitors/get-monitors-filtered/',
    filters
  });

  return (
    <ProductLayout title="Our Monitors">
      <ProductListHeader title="Our Monitors" />
      <ProductFilterLayout filterComponent={
        <MonitorFilters filters={filters} onFilterChange={setFilters} />
      }>
        <ProductGrid
          isLoading={isLoading}
          showLoadMore={showLoadMore}
          onLoadMore={loadMore}
          isFetching={isFetching}
        >
          {monitors?.map((monitor) => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </ProductGrid>
      </ProductFilterLayout>
    </ProductLayout>
  );
}