import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LaptopBasicInfo } from "@/components/create-laptop/LaptopBasicInfo";
import { LaptopDisplayInfo } from "@/components/create-laptop/LaptopDisplayInfo";
import { LaptopPerformanceInfo } from "@/components/create-laptop/LaptopPerformanceInfo";
import { LaptopGraphicsInfo } from "@/components/create-laptop/LaptopGraphicsInfo";
import { LaptopAdditionalInfo } from "@/components/create-laptop/LaptopAdditionalInfo";
import { getFormDataWithOnlyFilledFields } from "@/utils/formUtils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

interface EditLaptopFormProps {
  id: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const EditLaptopForm = ({ id, isLoading, setIsLoading }: EditLaptopFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [jsonInput, setJsonInput] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>(['']);

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
      // Get form data and add images_url if any images are provided
      data = getFormDataWithOnlyFilledFields(e.currentTarget);
      
      // Filter out empty image URLs and create the nested structure
      const nonEmptyImageUrls = imageUrls.filter(url => url.trim() !== '');
      if (nonEmptyImageUrls.length > 0) {
        data.images_url = nonEmptyImageUrls.map(url => ({ url: url }));
      }
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/laptops/patch-laptop/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Laptop updated successfully",
        });
        navigate(`/laptops/${id}`);
      } else if (response.status === 401) {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.detail || "Unauthorized action",
        });
      } else {
        throw new Error("Failed to update laptop");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update laptop",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-md border border-white/10">
      <h1 className="text-2xl font-bold text-white mb-6">Edit Laptop</h1>
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
          <LaptopBasicInfo className="mt-8" isEditing={true} />
          <LaptopDisplayInfo className="mt-8" isEditing={true} />
          <LaptopPerformanceInfo className="mt-8" isEditing={true} />
          <LaptopGraphicsInfo className="mt-8" />
          <LaptopAdditionalInfo className="mt-8" />

          <div className="mt-8 space-y-4">
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
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/laptops/${id}`)}
            className="bg-white/10 text-white hover:bg-white/20"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-medium transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
          >
            {isLoading ? "Updating..." : "Update Laptop"}
          </Button>
        </div>
      </form>
    </Card>
  );
};