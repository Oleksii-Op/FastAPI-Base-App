import { Badge } from "@/components/ui/badge";

interface DesktopBasicInfoProps {
  name: string;
  maker?: string;
  id: string;
  price: number;
  is_available: boolean;
  description?: string;
}

export const DesktopBasicInfo = ({ 
  name, 
  maker, 
  id, 
  price, 
  is_available,
  description 
}: DesktopBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">{name}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        {maker && <span>Brand: {maker}</span>}
        {id && <span>Product Code: {id}</span>}
      </div>
      {description && (
        <p className="text-gray-300">{description}</p>
      )}
      <p className="text-2xl font-bold text-blue-400">${price.toLocaleString()}</p>
      {is_available ? (
        <Badge variant="default" className="bg-green-500">In Stock</Badge>
      ) : (
        <Badge variant="default" className="bg-red-500">Out of Stock</Badge>
      )}
    </div>
  );
};