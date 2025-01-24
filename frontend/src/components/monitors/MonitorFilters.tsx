import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DisplayFilters } from "./filters/DisplayFilters";
import { ConnectivityFilters } from "./filters/ConnectivityFilters";
import { FeatureFilters } from "./filters/FeatureFilters";
import { ActiveFilters } from "./filters/ActiveFilters";
import { useState, useEffect } from "react";
import { RangeFilter } from "@/components/laptops/filters/RangeFilter";

interface UniqueAttributes {
  price_range: { min: number; max: number };
  diagonal_range: { min: number; max: number };
  brightness: { min: number; max: number };
  response_time: { min: number; max: number };
  refresh_rate: { min: number; max: number };
  makers: string[];
  resolution: string[];
  panel_type: string[];
  contrast_ratio: string[];
  aspect_ratio: string[];
  vesa: string[];
  hdmi_connection: number[];
  dp_connection: number[];
  vga_connection: number[];
  usb_2: number[];
  usb_type_c: number[];
  usb_type_c_thunderbolt: number[];
}

interface MonitorFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
}

export function MonitorFilters({ filters, onFilterChange }: MonitorFiltersProps) {
  const [uniqueAttrs, setUniqueAttrs] = useState<UniqueAttributes>({
    price_range: { min: 0, max: 5000 },
    diagonal_range: { min: 0, max: 100 },
    brightness: { min: 0, max: 1000 },
    response_time: { min: 0, max: 10 },
    refresh_rate: { min: 0, max: 360 },
    makers: [],
    resolution: [],
    panel_type: [],
    contrast_ratio: [],
    aspect_ratio: [],
    vesa: [],
    hdmi_connection: [],
    dp_connection: [],
    vga_connection: [],
    usb_2: [],
    usb_type_c: [],
    usb_type_c_thunderbolt: [],
  });

  useEffect(() => {
    const fetchUniqueAttributes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/monitors/get-unique-attrs/`
        );
        if (!response.ok) throw new Error("Failed to fetch unique attributes");
        const data = await response.json();
        console.log("Fetched unique attributes:", data);
        setUniqueAttrs(data);
      } catch (error) {
        console.error("Error fetching unique attributes:", error);
      }
    };

    fetchUniqueAttributes();
  }, []);

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters };
    if (value === undefined || (Array.isArray(value) && value.length === 0)) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 overflow-hidden">
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="p-4">
          <ActiveFilters filters={filters} onReset={handleReset} />
          
          <Accordion type="single" collapsible defaultValue="" className="w-full space-y-4">
            <AccordionItem value="price">
              <AccordionTrigger className="text-white">Price Range</AccordionTrigger>
              <RangeFilter
                title="Price"
                min={uniqueAttrs.price_range.min}
                max={uniqueAttrs.price_range.max}
                step={50}
                currentMin={filters.price_min}
                currentMax={filters.price_max}
                unit="$"
                onValueChange={(min, max) => {
                  updateFilter("price_min", min);
                  updateFilter("price_max", max);
                }}
              />
            </AccordionItem>

            <AccordionItem value="display">
              <AccordionTrigger className="text-white">Display</AccordionTrigger>
              <DisplayFilters
                uniqueAttrs={{
                  resolutions: uniqueAttrs.resolution,
                  panel_types: uniqueAttrs.panel_type,
                  contrast_ratios: uniqueAttrs.contrast_ratio,
                  aspect_ratios: uniqueAttrs.aspect_ratio,
                  diagonal_range: uniqueAttrs.diagonal_range,
                  brightness_range: uniqueAttrs.brightness,
                  response_time_range: uniqueAttrs.response_time,
                  refresh_rate_range: uniqueAttrs.refresh_rate,
                }}
                filters={filters}
                updateFilter={updateFilter}
              />
            </AccordionItem>

            <AccordionItem value="connectivity">
              <AccordionTrigger className="text-white">Connectivity</AccordionTrigger>
              <ConnectivityFilters
                uniqueAttrs={{
                  hdmi_connections: uniqueAttrs.hdmi_connection,
                  dp_connections: uniqueAttrs.dp_connection,
                  vga_connections: uniqueAttrs.vga_connection,
                  usb_2_ports: uniqueAttrs.usb_2,
                  usb_type_c_ports: uniqueAttrs.usb_type_c,
                  usb_type_c_thunderbolt_ports: uniqueAttrs.usb_type_c_thunderbolt,
                }}
                filters={filters}
                updateFilter={updateFilter}
              />
            </AccordionItem>

            <AccordionItem value="features">
              <AccordionTrigger className="text-white">Features</AccordionTrigger>
              <FeatureFilters
                uniqueAttrs={{
                  vesa_mountings: uniqueAttrs.vesa,
                }}
                filters={filters}
                updateFilter={updateFilter}
              />
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}