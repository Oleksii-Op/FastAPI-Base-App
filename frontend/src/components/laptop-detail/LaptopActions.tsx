import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LaptopActionsProps {
  id: string;
  canDeleteLaptop: boolean;
  onDelete: () => void;
}

export const LaptopActions = ({ id, canDeleteLaptop, onDelete }: LaptopActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex gap-2">
      <Button 
        onClick={() => navigate(`/edit-laptop/${id}`)}
        className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600"
      >
        <Edit className="mr-2 h-4 w-4" />
        Edit Laptop
      </Button>
      {canDeleteLaptop && (
        <Button 
          variant="destructive"
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Laptop
        </Button>
      )}
    </div>
  );
};