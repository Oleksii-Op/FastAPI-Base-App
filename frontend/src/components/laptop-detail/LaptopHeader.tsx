import { Badge } from "@/components/ui/badge";

interface LaptopHeaderProps {
  name: string;
  description?: string;
  price: number;
  is_available: boolean;
  maker?: string;
  id?: string;
}

export const LaptopHeader = ({ name, description, price, is_available, maker, id }: LaptopHeaderProps) => {
  return (
    <div className="space-y-4">
      {maker && id && (
        <p className="text-blue-400 font-medium">Brand: {maker} | Product Code: {id}</p>
      )}
      <h1 className="text-4xl font-bold text-white">{name}</h1>
      {description && (
        <p className="text-xl text-gray-400">{description}</p>
      )}
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-green-400">
          ${price.toLocaleString()}
        </span>
        {is_available ? (
          <Badge variant="default" className="bg-green-500">In Stock</Badge>
        ) : (
          <Badge variant="default" className="bg-red-500">Out of Stock</Badge>
        )}
      </div>
    </div>
  );
};