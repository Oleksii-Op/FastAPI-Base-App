import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LaptopAdditionalInfoProps {
  className?: string;
}

export const LaptopAdditionalInfo = ({ className }: LaptopAdditionalInfoProps) => {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-white mb-6">Additional Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="hardware_type" className="text-white">
            Hardware Type <span className="text-sm text-gray-400">(Optional)</span>
          </Label>
          <Input
            id="hardware_type"
            name="hardware_type"
            placeholder="e.g. Laptop"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="warranty" className="text-white">
              Warranty <span className="text-sm text-gray-400">(Optional)</span>
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-blue-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the warranty period, e.g., "2 years"</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="warranty"
            name="warranty"
            placeholder="e.g. 2 years"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="installed_os" className="text-white">
            Operating System <span className="text-sm text-gray-400">(Optional)</span>
          </Label>
          <Input
            id="installed_os"
            name="installed_os"
            placeholder="e.g. Windows 11"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="weight" className="text-white">
              Weight (kg) <span className="text-sm text-gray-400">(Optional)</span>
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-blue-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the laptop weight in kilograms</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            placeholder="e.g. 1.5"
            className="bg-white/10 text-white border-white/20"
          />
        </div>
      </div>
    </div>
  );
};