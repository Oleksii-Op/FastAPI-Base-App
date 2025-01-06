import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { UserData } from "@/types/user";
import { UserFormData } from "./types";
import { useState } from "react";

interface EditUserDialogProps {
  user: UserData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: number, data: UserFormData) => Promise<void>;
  isLoading: boolean;
}

export const EditUserDialog = ({ user, isOpen, onClose, onSave, isLoading }: EditUserDialogProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    username: user?.username || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    password: "",
    is_active: user?.is_active || false,
    is_superuser: user?.is_superuser || false,
    is_verified: user?.is_verified || false,
  });

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(user.id, formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1F2C] border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="bg-[#1A1F2C] border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-[#1A1F2C] border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.first_name}
              onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
              className="bg-[#1A1F2C] border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.last_name}
              onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
              className="bg-[#1A1F2C] border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">New Password (optional)</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="bg-[#1A1F2C] border-white/10 text-white"
            />
          </div>
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="isActive" className="text-sm">Active</Label>
              <Switch
                id="isActive"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                className="data-[state=checked]:bg-blue-600/30 data-[state=unchecked]:bg-gray-700"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isVerified" className="text-sm">Verified</Label>
              <Switch
                id="isVerified"
                checked={formData.is_verified}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_verified: checked }))}
                className="data-[state=checked]:bg-blue-600/30 data-[state=unchecked]:bg-gray-700"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isSuperuser" className="text-sm">Super User</Label>
              <Switch
                id="isSuperuser"
                checked={formData.is_superuser}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_superuser: checked }))}
                className="data-[state=checked]:bg-blue-600/30 data-[state=unchecked]:bg-gray-700"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-white/10 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};