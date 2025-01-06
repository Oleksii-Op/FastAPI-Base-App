import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MonitorPlay, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LaptopGraphicsInfoProps {
  className?: string;
}

export const LaptopGraphicsInfo = ({ className }: LaptopGraphicsInfoProps) => {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-white mb-6">Graphics Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MonitorPlay className="h-4 w-4 text-blue-400" />
            <Label htmlFor="gpu_model" className="text-white">
              GPU Model <span className="text-sm text-gray-400">(Optional)</span>
            </Label>
          </div>
          <Input
            id="gpu_model"
            name="gpu_model"
            placeholder="e.g. NVIDIA RTX 4070"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="gpu_memory" className="text-white">
              GPU Memory <span className="text-sm text-gray-400">(Optional)</span>
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-blue-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the GPU memory size, e.g., "8GB GDDR6"</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="gpu_memory"
            name="gpu_memory"
            placeholder="e.g. 8GB"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gpu_memory_type" className="text-white">
            GPU Memory Type <span className="text-sm text-gray-400">(Optional)</span>
          </Label>
          <Input
            id="gpu_memory_type"
            name="gpu_memory_type"
            placeholder="e.g. GDDR6"
            className="bg-white/10 text-white border-white/20"
          />
        </div>
      </div>
    </div>
  );
};