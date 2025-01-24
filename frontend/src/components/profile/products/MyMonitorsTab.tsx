import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MonitorCard } from "@/components/MonitorCard";
import { Plus } from "lucide-react";
import { MonitorPreview } from "@/types/monitor";

export const MyMonitorsTab = () => {
  const navigate = useNavigate();
  const [offset] = useState(0);
  const limit = 50;

  const { data: monitors, isLoading } = useQuery({
    queryKey: ["my-monitors", offset],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/monitors/get-my-monitors?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch monitors");
      return response.json();
    },
  });

  if (isLoading) {
    return <div className="text-center text-white">Loading your monitors...</div>;
  }

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="pt-6">
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => navigate('/create-monitor')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Monitor
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monitors?.map((monitor: MonitorPreview) => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};