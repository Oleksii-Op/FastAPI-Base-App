import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface UserIdInputProps {
  onFetchUser: (searchValue: string, searchType: string) => Promise<void>;
  isLoading: boolean;
}

export const UserIdInput = ({ onFetchUser, isLoading }: UserIdInputProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("id");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onFetchUser(searchValue, searchType);
    }
  };

  const getPlaceholder = () => {
    switch (searchType) {
      case "id":
        return "Enter user ID";
      case "username":
        return "Enter username (coming soon)";
      case "email":
        return "Enter email address (coming soon)";
      case "name":
        return "Enter first or last name (coming soon)";
      case "phone":
        return "Enter phone number (coming soon)";
      default:
        return "Enter search value";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Select
        value={searchType}
        onValueChange={setSearchType}
      >
        <SelectTrigger className="w-[180px] bg-[#1A1F2C] border-white/10 text-white">
          <SelectValue placeholder="Search by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="username">Username</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="phone">Phone</SelectItem>
        </SelectContent>
      </Select>
      
      <Input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={getPlaceholder()}
        className="bg-[#1A1F2C] border-white/10 text-white flex-1"
        disabled={searchType !== "id"}
      />
      
      <Button 
        type="submit" 
        disabled={isLoading || !searchValue.trim() || searchType !== "id"}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Search User"
        )}
      </Button>
    </form>
  );
};