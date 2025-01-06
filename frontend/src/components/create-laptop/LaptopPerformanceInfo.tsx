import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cpu, MemoryStick, HardDrive, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LaptopPerformanceInfoProps {
  className?: string;
  isEditing?: boolean;
}

export const LaptopPerformanceInfo = ({ className, isEditing = false }: LaptopPerformanceInfoProps) => {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-white mb-6">Performance Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-blue-400" />
            <Label htmlFor="cpu_model" className="text-white">CPU Model {!isEditing && '*'}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-blue-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the full CPU model name, e.g., "Intel Core i7-12700H"</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="cpu_model"
            name="cpu_model"
            required={!isEditing}
            placeholder="e.g. Intel Core i7-12700H"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-blue-400" />
            <Label htmlFor="cpu_class" className="text-white">CPU Class {!isEditing && '*'}</Label>
          </div>
          <Input
            id="cpu_class"
            name="cpu_class"
            required={!isEditing}
            placeholder="e.g. High-end"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpu_frequency" className="text-white">
            CPU Frequency <span className="text-sm text-gray-400">(Optional)</span>
          </Label>
          <Input
            id="cpu_frequency"
            name="cpu_frequency"
            placeholder="e.g. 2.3GHz"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cpu_cores" className="text-white">
              CPU Cores <span className="text-sm text-gray-400">(Optional)</span>
            </Label>
            <Input
              id="cpu_cores"
              name="cpu_cores"
              type="number"
              placeholder="e.g. 8"
              className="bg-white/10 text-white border-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpu_threads" className="text-white">
              CPU Threads <span className="text-sm text-gray-400">(Optional)</span>
            </Label>
            <Input
              id="cpu_threads"
              name="cpu_threads"
              type="number"
              placeholder="e.g. 16"
              className="bg-white/10 text-white border-white/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MemoryStick className="h-4 w-4 text-blue-400" />
            <Label htmlFor="ram_size" className="text-white">RAM Size {!isEditing && '*'}</Label>
          </div>
          <Input
            id="ram_size"
            name="ram_size"
            required={!isEditing}
            placeholder="e.g. 16GB"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ram_type" className="text-white">
            RAM Type <span className="text-sm text-gray-400">(Optional)</span>
          </Label>
          <Input
            id="ram_type"
            name="ram_type"
            placeholder="e.g. DDR5"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ram_frequency" className="text-white">
            RAM Frequency <span className="text-sm text-gray-400">(Optional)</span>
          </Label>
          <Input
            id="ram_frequency"
            name="ram_frequency"
            placeholder="e.g. 4800MHz"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-blue-400" />
            <Label htmlFor="storage_size" className="text-white">Storage Size {!isEditing && '*'}</Label>
          </div>
          <Input
            id="storage_size"
            name="storage_size"
            required={!isEditing}
            placeholder="e.g. 512GB"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storage_type" className="text-white">
            Storage Type <span className="text-sm text-gray-400">(Optional)</span>
          </Label>
          <Input
            id="storage_type"
            name="storage_type"
            placeholder="e.g. NVMe SSD"
            className="bg-white/10 text-white border-white/20"
          />
        </div>
      </div>
    </div>
  );
};
