import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LaptopNavigationProps {
  onBack: () => void;
}

export const LaptopNavigation = ({ onBack }: LaptopNavigationProps) => {
  return (
    <Button onClick={onBack} variant="ghost" className="text-white">
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
};