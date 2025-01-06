import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LaptopBasicInfo } from "@/components/create-laptop/LaptopBasicInfo";
import { LaptopDisplayInfo } from "@/components/create-laptop/LaptopDisplayInfo";
import { LaptopPerformanceInfo } from "@/components/create-laptop/LaptopPerformanceInfo";
import { LaptopGraphicsInfo } from "@/components/create-laptop/LaptopGraphicsInfo";
import { LaptopAdditionalInfo } from "@/components/create-laptop/LaptopAdditionalInfo";
import { getFormDataWithOnlyFilledFields } from "@/utils/formUtils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface EditLaptopFormProps {
  id: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const EditLaptopForm = ({ id, isLoading, setIsLoading }: EditLaptopFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    
    // Only get fields that have been filled out
    const data = getFormDataWithOnlyFilledFields(e.currentTarget);
    
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
        <LaptopBasicInfo className="mt-8" isEditing={true} />
        <LaptopDisplayInfo className="mt-8" isEditing={true} />
        <LaptopPerformanceInfo className="mt-8" isEditing={true} />
        <LaptopGraphicsInfo className="mt-8" />
        <LaptopAdditionalInfo className="mt-8" />
        
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