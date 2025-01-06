import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LaptopDetail } from "@/types/laptop";
import { EditLaptopForm } from "@/components/edit-laptop/EditLaptopForm";

const EditLaptop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [laptop, setLaptop] = useState<LaptopDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLaptop = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/laptops/get-laptop-by-uuid/{uuid}?laptop_id=${id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setLaptop(data);
          
          // Pre-fill form fields with laptop data
          Object.entries(data).forEach(([key, value]) => {
            const element = document.getElementsByName(key)[0] as HTMLInputElement;
            if (element && value !== null && value !== undefined) {
              element.value = value.toString();
            }
          });
        } else if (response.status === 401) {
          toast({
            variant: "destructive",
            title: "Unauthorized",
            description: "Please log in again",
          });
          navigate("/");
        } else {
          throw new Error("Failed to fetch laptop");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load laptop data",
        });
        navigate("/laptops");
      }
    };

    fetchLaptop();
  }, [id, navigate, toast]);

  if (!laptop) {
    return (
      <div className="min-h-screen bg-[#1A1F2C] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <EditLaptopForm id={id!} isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default EditLaptop;