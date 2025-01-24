import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LaptopBasicInfoProps {
  className?: string;
  isEditing?: boolean;
}

const commonMakers = ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "MSI", "Samsung"];

export const LaptopBasicInfo = ({ className, isEditing = false }: LaptopBasicInfoProps) => {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-white mb-6">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="name" className="text-white">Name {!isEditing && '*'}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-blue-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the full model name, e.g., "MacBook Pro 14"</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="name"
            name="name"
            required={!isEditing}
            placeholder="e.g. MacBook Pro M2"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maker" className="text-white">Maker {!isEditing && '*'}</Label>
          <Select name="maker" required={!isEditing}>
            <SelectTrigger className="bg-white/10 text-white border-white/20">
              <SelectValue placeholder="Select manufacturer" />
            </SelectTrigger>
            <SelectContent>
              {commonMakers.map((maker) => (
                <SelectItem key={maker} value={maker}>
                  {maker}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-white">Price {!isEditing && '*'}</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            required={!isEditing}
            placeholder="e.g. 1299.99"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color" className="text-white">
            Color <span className="text-sm text-gray-400">(Optional)</span>
          </Label>
          <Input
            id="color"
            name="color"
            placeholder="e.g. Space Gray"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="image" className="text-white">Main Image URL {!isEditing && '*'}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-blue-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter a valid image URL. The image will be displayed in the preview.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="image"
            name="image"
            required={!isEditing}
            placeholder="e.g. https://example.com/laptop-image.jpg"
            className="bg-white/10 text-white border-white/20"
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description" className="text-white">
            Description <span className="text-sm text-gray-400">(Optional)</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter laptop description"
            className="bg-white/10 text-white border-white/20 min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};