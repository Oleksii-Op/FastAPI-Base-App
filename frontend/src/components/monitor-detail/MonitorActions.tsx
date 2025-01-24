import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MonitorActionsProps {
  id: string;
  canDeleteMonitor: boolean;
  onDelete: () => void;
}

export const MonitorActions = ({ id, canDeleteMonitor, onDelete }: MonitorActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex gap-2">
      <Button 
        onClick={() => navigate(`/edit-monitor/${id}`)}
        className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600"
      >
        <Edit className="mr-2 h-4 w-4" />
        Edit Monitor
      </Button>
      <Button 
        variant="destructive"
        onClick={onDelete}
        className="bg-red-600 hover:bg-red-700"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Monitor
      </Button>
    </div>
  );
};