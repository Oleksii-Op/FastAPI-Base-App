import { Badge } from "@/components/ui/badge";

interface LaptopBasicInfoProps {
  name: string;
  maker?: string;
  id: string;
  price: number;
  is_available: boolean;
}

export const LaptopBasicInfo = ({ name, maker, id, price, is_available }: LaptopBasicInfoProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
        {maker && <span>Brand: {maker}</span>}
        {id && <span>Product Code: {id}</span>}
      </div>
      <p className="text-2xl font-bold text-blue-400">${price.toLocaleString()}</p>
      {is_available ? (
        <Badge variant="default" className="bg-green-500 mt-2">In Stock</Badge>
      ) : (
        <Badge variant="default" className="bg-red-500 mt-2">Out of Stock</Badge>
      )}
    </div>
  );
};