import { Card, CardContent } from "@/components/ui/card";
import { LaptopCreate } from "@/types/laptop";

interface LaptopPreviewCardProps {
  data: Partial<LaptopCreate>;
}

export const LaptopPreviewCard = ({ data }: LaptopPreviewCardProps) => {
  const formatValue = (value: any) => {
    if (value === null || value === undefined || value === "") return "N/A";
    return value;
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-white">Preview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div className="space-y-2">
            <h4 className="text-lg font-medium text-white">Basic Information</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Name: <span className="text-white">{formatValue(data.name)}</span></p>
              <p className="text-sm text-gray-400">Price: <span className="text-white">{formatValue(data.price)}</span></p>
              <p className="text-sm text-gray-400">Maker: <span className="text-white">{formatValue(data.maker)}</span></p>
              <p className="text-sm text-gray-400">Color: <span className="text-white">{formatValue(data.color)}</span></p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-medium text-white">Display</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Screen Size: <span className="text-white">{formatValue(data.diagonal)}</span></p>
              <p className="text-sm text-gray-400">Resolution: <span className="text-white">{formatValue(data.resolution)}</span></p>
              <p className="text-sm text-gray-400">Screen Type: <span className="text-white">{formatValue(data.screen_type)}</span></p>
              <p className="text-sm text-gray-400">Refresh Rate: <span className="text-white">{formatValue(data.screen_frequency)}</span></p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-medium text-white">Performance</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">CPU: <span className="text-white">{formatValue(data.cpu_model)}</span></p>
              <p className="text-sm text-gray-400">CPU Class: <span className="text-white">{formatValue(data.cpu_class)}</span></p>
              <p className="text-sm text-gray-400">CPU Frequency: <span className="text-white">{formatValue(data.cpu_frequency)}</span></p>
              <p className="text-sm text-gray-400">CPU Cores: <span className="text-white">{formatValue(data.cpu_cores)}</span></p>
              <p className="text-sm text-gray-400">CPU Threads: <span className="text-white">{formatValue(data.cpu_threads)}</span></p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-medium text-white">Memory & Storage</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">RAM Size: <span className="text-white">{formatValue(data.ram_size)}</span></p>
              <p className="text-sm text-gray-400">RAM Type: <span className="text-white">{formatValue(data.ram_type)}</span></p>
              <p className="text-sm text-gray-400">RAM Frequency: <span className="text-white">{formatValue(data.ram_frequency)}</span></p>
              <p className="text-sm text-gray-400">Storage: <span className="text-white">{formatValue(data.storage_size)}</span></p>
              <p className="text-sm text-gray-400">Storage Type: <span className="text-white">{formatValue(data.storage_type)}</span></p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-medium text-white">Graphics</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">GPU Model: <span className="text-white">{formatValue(data.gpu_model)}</span></p>
              <p className="text-sm text-gray-400">GPU Memory: <span className="text-white">{formatValue(data.gpu_memory)}</span></p>
              <p className="text-sm text-gray-400">GPU Memory Type: <span className="text-white">{formatValue(data.gpu_memory_type)}</span></p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-medium text-white">Additional Info</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Extra Hardware: <span className="text-white">{formatValue(data.extra_hardware)}</span></p>
              <p className="text-sm text-gray-400">Warranty: <span className="text-white">{formatValue(data.warranty)}</span></p>
              <p className="text-sm text-gray-400">OS: <span className="text-white">{formatValue(data.installed_os)}</span></p>
              <p className="text-sm text-gray-400">Weight: <span className="text-white">{formatValue(data.weight)}</span></p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};