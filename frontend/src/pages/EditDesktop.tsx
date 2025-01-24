import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Desktop } from "@/types/desktop";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function EditDesktop() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: desktop, isLoading } = useQuery({
    queryKey: ["desktop", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/desktops/get-desktop-by-uuid/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch desktop");
      return response.json() as Promise<Desktop>;
    },
  });

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/desktops/patch-desktop/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update desktop");

      toast({
        title: "Success",
        description: "Desktop has been updated successfully",
      });

      navigate(`/desktops/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update desktop",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!desktop) {
    return <div>Desktop not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/desktops/${id}`)}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Desktop Details
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Desktop</h1>
        {/* Form implementation will go here */}
        <p className="text-gray-500">Form implementation pending...</p>
      </div>
    </div>
  );
}