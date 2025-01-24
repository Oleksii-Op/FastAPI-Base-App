import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Minus } from "lucide-react";
import { getFormDataWithOnlyFilledFields } from "@/utils/formUtils";

interface EditMonitorFormProps {
  monitorId: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditMonitorForm({ monitorId, isLoading, setIsLoading }: EditMonitorFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [jsonInput, setJsonInput] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isCurved, setIsCurved] = useState(false);
  const [hasSpeaker, setHasSpeaker] = useState(false);
  const [pivot, setPivot] = useState(false);
  const [isAdjustableHeight, setIsAdjustableHeight] = useState(false);
  const [hasTouchscreen, setHasTouchscreen] = useState(false);

  const handleAddImageField = () => {
    if (imageUrls.length < 6) {
      setImageUrls([...imageUrls, '']);
    }
  };

  const handleRemoveImageField = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    
    let data;
    if (jsonInput.trim()) {
      try {
        data = JSON.parse(jsonInput);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Invalid JSON",
          description: "Please check your JSON format",
        });
        setIsLoading(false);
        return;
      }
    } else {
      data = getFormDataWithOnlyFilledFields(e.currentTarget);
      
      // Add boolean fields
      data.is_available = isAvailable;
      data.is_curved = isCurved;
      data.has_speaker = hasSpeaker;
      data.pivot = pivot;
      data.is_adjustable_height = isAdjustableHeight;
      data.has_touchscreen = hasTouchscreen;

      const nonEmptyImageUrls = imageUrls.filter(url => url.trim() !== '');
      if (nonEmptyImageUrls.length > 0) {
        data.images_url = nonEmptyImageUrls.map(url => ({ url: url }));
      }
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/monitors/patch-monitor/${monitorId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Monitor updated successfully",
        });
        navigate(`/monitors/${monitorId}`);
      } else {
        throw new Error("Failed to update monitor");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update monitor",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-md border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="jsonInput" className="text-white">
            JSON Model (Optional)
          </Label>
          <Textarea
            id="jsonInput"
            placeholder="Paste your JSON model here to update multiple fields at once"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="h-[200px] bg-white/10 text-white border-white/20 font-mono"
          />
          <p className="text-sm text-gray-400">
            If you provide a JSON model, individual field inputs below will be ignored.
          </p>
        </div>

        <div className="border-t border-white/10 my-6 pt-6">
          <p className="text-sm text-gray-400 mb-6">
            Or update individual fields below:
          </p>

          <div className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  name="name"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="maker" className="text-white">Maker</Label>
                <Input
                  id="maker"
                  name="maker"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="price" className="text-white">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="is_available" className="text-white">Available</Label>
                <Switch
                  id="is_available"
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                />
              </div>
            </div>

            {/* Display Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="diagonal" className="text-white">Screen Size (inches)</Label>
                <Input
                  id="diagonal"
                  name="diagonal"
                  type="number"
                  step="0.1"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="resolution" className="text-white">Resolution</Label>
                <Input
                  id="resolution"
                  name="resolution"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="panel_type" className="text-white">Panel Type</Label>
                <Input
                  id="panel_type"
                  name="panel_type"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="refresh_rate" className="text-white">Refresh Rate (Hz)</Label>
                <Input
                  id="refresh_rate"
                  name="refresh_rate"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="brightness" className="text-white">Brightness (nits)</Label>
                <Input
                  id="brightness"
                  name="brightness"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="response_time" className="text-white">Response Time (ms)</Label>
                <Input
                  id="response_time"
                  name="response_time"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="contrast_ratio" className="text-white">Contrast Ratio</Label>
                <Input
                  id="contrast_ratio"
                  name="contrast_ratio"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="aspect_ratio" className="text-white">Aspect Ratio</Label>
                <Input
                  id="aspect_ratio"
                  name="aspect_ratio"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="color_gamut" className="text-white">Color Gamut (%)</Label>
                <Input
                  id="color_gamut"
                  name="color_gamut"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>
            </div>

            {/* Connectivity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="hdmi_connection" className="text-white">HDMI Ports</Label>
                <Input
                  id="hdmi_connection"
                  name="hdmi_connection"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="dp_connection" className="text-white">DisplayPort</Label>
                <Input
                  id="dp_connection"
                  name="dp_connection"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="jack_connection" className="text-white">Audio Jack</Label>
                <Input
                  id="jack_connection"
                  name="jack_connection"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="vga_connection" className="text-white">VGA Ports</Label>
                <Input
                  id="vga_connection"
                  name="vga_connection"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="usb_2" className="text-white">USB 2.0 Ports</Label>
                <Input
                  id="usb_2"
                  name="usb_2"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="usb_type_c" className="text-white">USB-C Ports</Label>
                <Input
                  id="usb_type_c"
                  name="usb_type_c"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="usb_type_c_thunderbolt" className="text-white">Thunderbolt Ports</Label>
                <Input
                  id="usb_type_c_thunderbolt"
                  name="usb_type_c_thunderbolt"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="is_curved" className="text-white">Curved Display</Label>
                <Switch
                  id="is_curved"
                  checked={isCurved}
                  onCheckedChange={setIsCurved}
                />
              </div>

              <div>
                <Label htmlFor="vesa_mounting" className="text-white">VESA Mount</Label>
                <Input
                  id="vesa_mounting"
                  name="vesa_mounting"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="has_speaker" className="text-white">Built-in Speakers</Label>
                <Switch
                  id="has_speaker"
                  checked={hasSpeaker}
                  onCheckedChange={setHasSpeaker}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="pivot" className="text-white">Pivot Support</Label>
                <Switch
                  id="pivot"
                  checked={pivot}
                  onCheckedChange={setPivot}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="is_adjustable_height" className="text-white">Height Adjustable</Label>
                <Switch
                  id="is_adjustable_height"
                  checked={isAdjustableHeight}
                  onCheckedChange={setIsAdjustableHeight}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="has_touchscreen" className="text-white">Touch Screen</Label>
                <Switch
                  id="has_touchscreen"
                  checked={hasTouchscreen}
                  onCheckedChange={setHasTouchscreen}
                />
              </div>
            </div>

            {/* Physical Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width" className="text-white">Width (mm)</Label>
                <Input
                  id="width"
                  name="width"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="height" className="text-white">Height (mm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="depth" className="text-white">Depth (mm)</Label>
                <Input
                  id="depth"
                  name="depth"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="weight" className="text-white">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="accessories" className="text-white">Accessories</Label>
                <Input
                  id="accessories"
                  name="accessories"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="energy_class" className="text-white">Energy Class</Label>
                <Input
                  id="energy_class"
                  name="energy_class"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <Label htmlFor="warranty" className="text-white">Warranty (months)</Label>
                <Input
                  id="warranty"
                  name="warranty"
                  type="number"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <Label htmlFor="image" className="text-white">Main Image URL</Label>
              <Input
                id="image"
                name="image"
                className="bg-white/10 text-white border-white/20"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Additional Images (Up to 6)</Label>
                {imageUrls.length < 6 && (
                  <Button
                    type="button"
                    onClick={handleAddImageField}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 text-white hover:bg-white/20"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image URL
                  </Button>
                )}
              </div>
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    placeholder={`Image URL ${index + 1}`}
                    className="bg-white/10 text-white border-white/20"
                  />
                  {imageUrls.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => handleRemoveImageField(index)}
                      variant="destructive"
                      size="icon"
                      className="shrink-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/monitors/${monitorId}`)}
            className="bg-white/10 text-white hover:bg-white/20"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-medium transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
          >
            {isLoading ? "Updating..." : "Update Monitor"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
