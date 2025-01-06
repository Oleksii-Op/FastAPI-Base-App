import { useQuery } from "@tanstack/react-query";
import { LaptopCard } from "@/components/LaptopCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LaptopPreview } from "@/types/laptop";

export const MyLaptops = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const limit = 50;

  const { data: laptops, isLoading } = useQuery({
    queryKey: ["my-laptops", offset],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/laptops/get-my-laptops?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch laptops");
      return response.json();
    },
  });

  const loadMore = () => {
    setOffset(prev => prev + limit);
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading your laptops...</div>;
  }

  if (!laptops || laptops.length === 0) {
    return (
      <div className="text-center space-y-4">
        <p className="text-white text-xl">You have created no Laptops for now</p>
        <Button
          onClick={() => navigate('/create-laptop')}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Your First Laptop
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My Laptops</h2>
        <Button
          onClick={() => navigate('/create-laptop')}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Laptop
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {laptops.map((laptop: LaptopPreview) => (
          <LaptopCard key={laptop.id} laptop={laptop} />
        ))}
      </div>

      {laptops.length >= limit && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={loadMore}
            className="bg-white/10 text-white hover:bg-white/20 hover:text-white border-white/30"
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};