import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LaptopCard } from "@/components/LaptopCard";
import { Plus } from "lucide-react";
import { LaptopPreview } from "@/types/laptop";

export const MyLaptopsTab = () => {
  const navigate = useNavigate();
  const [offset] = useState(0);
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

  if (isLoading) {
    return <div className="text-center text-white">Loading your laptops...</div>;
  }

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="pt-6">
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => navigate('/create-laptop')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Laptop
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laptops?.map((laptop: LaptopPreview) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};