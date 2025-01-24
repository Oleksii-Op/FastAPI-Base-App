import { MonitorPreview } from "@/types/monitor";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Monitor } from "lucide-react";

interface MonitorCardProps {
  monitor: MonitorPreview;
}

export function MonitorCard({ monitor }: MonitorCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-105"
      onClick={() => navigate(`/monitors/${monitor.id}`)}
    >
      <CardContent className="p-4">
        <div className="aspect-video relative mb-4">
          {monitor.image ? (
            <img
              src={monitor.image}
              alt={monitor.name}
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
              <Monitor className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <Badge 
            className={`absolute top-2 right-2 ${
              monitor.is_available 
                ? 'bg-green-500' 
                : 'bg-gray-500'
            }`}
          >
            {monitor.is_available ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 truncate">
          {monitor.name}
        </h3>
        <div className="space-y-1 text-sm text-gray-300">
          <p>Screen: {monitor.diagonal}" {monitor.panel_type}</p>
          <p>Resolution: {monitor.resolution}</p>
          <p>Refresh Rate: {monitor.refresh_rate}Hz</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xl font-bold text-white">${monitor.price.toLocaleString()}</p>
      </CardFooter>
    </Card>
  );
}