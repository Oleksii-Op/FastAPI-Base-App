import { LaptopPreview } from "@/types/laptop";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface LaptopCardProps {
  laptop: LaptopPreview;
}

export function LaptopCard({ laptop }: LaptopCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-105"
      onClick={() => navigate(`/laptops/${laptop.id}`)}
    >
      <CardContent className="p-4">
        <div className="aspect-video relative mb-4">
          <img
            src={laptop.image}
            alt={laptop.name}
            className="object-cover w-full h-full rounded-lg"
          />
          <Badge 
            className={`absolute top-2 right-2 ${
              laptop.is_available 
                ? 'bg-green-500' 
                : 'bg-gray-500'
            }`}
          >
            {laptop.is_available ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 truncate">
          {laptop.name}
        </h3>
        <div className="space-y-1 text-sm text-gray-300">
          <p>Screen: {laptop.diagonal} {laptop.screen_type}</p>
          <p>Resolution: {laptop.resolution}</p>
          <p>CPU: {laptop.cpu_model}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xl font-bold text-white">${laptop.price.toLocaleString()}</p>
      </CardFooter>
    </Card>
  );
}