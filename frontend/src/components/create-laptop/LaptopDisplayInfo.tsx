import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Monitor, Fullscreen, RefreshCw, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LaptopDisplayInfoProps {
  className?: string;
  isEditing?: boolean;
}

export const LaptopDisplayInfo = ({ className, isEditing = false }: LaptopDisplayInfoProps) => {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-white mb-6">Display Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-blue-400" />
            <Label htmlFor="diagonal" className="text-white">Screen Size {!isEditing && '*'}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-blue-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the screen size in inches, e.g., "14 inch"</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="diagonal"
            name="diagonal"
            required={!isEditing}
            placeholder="e.g. 14 inch"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Fullscreen className="h-4 w-4 text-blue-400" />
            <Label htmlFor="resolution" className="text-white">Resolution {!isEditing && '*'}</Label>
          </div>
          <Input
            id="resolution"
            name="resolution"
            required={!isEditing}
            placeholder="e.g. 2560x1600"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-blue-400" />
            <Label htmlFor="screen_type" className="text-white">Screen Type {!isEditing && '*'}</Label>
          </div>
          <Input
            id="screen_type"
            name="screen_type"
            required={!isEditing}
            placeholder="e.g. Retina"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-blue-400" />
            <Label htmlFor="screen_frequency" className="text-white">
              Refresh Rate <span className="text-sm text-gray-400">(Optional)</span>
            </Label>
          </div>
          <Input
            id="screen_frequency"
            name="screen_frequency"
            placeholder="e.g. 120Hz"
            className="bg-white/10 text-white border-white/20"
          />
        </div>
      </div>
    </div>
  );
};