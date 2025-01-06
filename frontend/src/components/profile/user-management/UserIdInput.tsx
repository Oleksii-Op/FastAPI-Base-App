import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface UserIdInputProps {
  onFetchUser: (userId: number) => Promise<void>;
  isLoading: boolean;
}

export const UserIdInput = ({ onFetchUser, isLoading }: UserIdInputProps) => {
  const [userId, setUserId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(userId);
    if (!isNaN(id)) {
      onFetchUser(id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="number"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID"
        className="bg-[#1A1F2C] border-white/10 text-white"
      />
      <Button 
        type="submit" 
        disabled={isLoading || !userId}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Fetch User"
        )}
      </Button>
    </form>
  );
};