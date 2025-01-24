import { SelectFilter } from "@/components/laptops/filters/SelectFilter";
import { AccordionContent } from "@/components/ui/accordion";

interface ConnectivityFiltersProps {
  uniqueAttrs: {
    hdmi_connections: number[];
    dp_connections: number[];
    vga_connections: number[];
    usb_2_ports: number[];
    usb_type_c_ports: number[];
    usb_type_c_thunderbolt_ports: number[];
  };
  filters: any;
  updateFilter: (key: string, value: any) => void;
}

export const ConnectivityFilters = ({ uniqueAttrs, filters, updateFilter }: ConnectivityFiltersProps) => {
  return (
    <AccordionContent className="space-y-4">
      <SelectFilter
        title="HDMI Ports"
        options={uniqueAttrs.hdmi_connections}
        value={filters.hdmi_connection?.map(String)}
        placeholder="Select HDMI ports"
        onValueChange={(value) => 
          updateFilter("hdmi_connection", value ? value.map(v => parseInt(v)) : undefined)
        }
      />
      <SelectFilter
        title="DisplayPort"
        options={uniqueAttrs.dp_connections}
        value={filters.dp_connection?.map(String)}
        placeholder="Select DisplayPort ports"
        onValueChange={(value) => 
          updateFilter("dp_connection", value ? value.map(v => parseInt(v)) : undefined)
        }
      />
      <SelectFilter
        title="VGA Ports"
        options={uniqueAttrs.vga_connections}
        value={filters.vga_connection?.map(String)}
        placeholder="Select VGA ports"
        onValueChange={(value) => 
          updateFilter("vga_connection", value ? value.map(v => parseInt(v)) : undefined)
        }
      />
      <SelectFilter
        title="USB 2.0 Ports"
        options={uniqueAttrs.usb_2_ports}
        value={filters.usb_2?.map(String)}
        placeholder="Select USB 2.0 ports"
        onValueChange={(value) => 
          updateFilter("usb_2", value ? value.map(v => parseInt(v)) : undefined)
        }
      />
      <SelectFilter
        title="USB Type-C"
        options={uniqueAttrs.usb_type_c_ports}
        value={filters.usb_type_c?.map(String)}
        placeholder="Select USB-C ports"
        onValueChange={(value) => 
          updateFilter("usb_type_c", value ? value.map(v => parseInt(v)) : undefined)
        }
      />
      <SelectFilter
        title="USB-C Thunderbolt"
        options={uniqueAttrs.usb_type_c_thunderbolt_ports}
        value={filters.usb_type_c_thunderbolt?.map(String)}
        placeholder="Select Thunderbolt ports"
        onValueChange={(value) => 
          updateFilter("usb_type_c_thunderbolt", value ? value.map(v => parseInt(v)) : undefined)
        }
      />
    </AccordionContent>
  );
};