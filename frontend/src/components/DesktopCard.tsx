import { DesktopPreview } from "@/types/desktop";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface DesktopCardProps {
  desktop: DesktopPreview;
}

export function DesktopCard({ desktop }: DesktopCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-105"
      onClick={() => navigate(`/desktops/${desktop.id}`)}
    >
      <CardContent className="p-4">
        <div className="aspect-video relative mb-4">
          <img
            src={desktop.image}
            alt={desktop.name}
            className="object-cover w-full h-full rounded-lg"
          />
          <Badge 
            className={`absolute top-2 right-2 ${
              desktop.is_available 
                ? 'bg-green-500' 
                : 'bg-gray-500'
            }`}
          >
            {desktop.is_available ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 truncate">
          {desktop.name}
        </h3>
        <div className="space-y-1 text-sm text-gray-300">
          <p>CPU: {desktop.cpu_model}</p>
          <p>GPU: {desktop.gpu_model}</p>
          <p>RAM: {desktop.ram_size}GB</p>
          <p>Storage: {desktop.storage_size}GB</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xl font-bold text-white">${desktop.price.toLocaleString()}</p>
      </CardFooter>
    </Card>
  );
}