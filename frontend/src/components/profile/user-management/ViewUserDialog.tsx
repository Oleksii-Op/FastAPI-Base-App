import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserDialogProps } from "./types";

export const ViewUserDialog = ({ user, isOpen, onClose }: UserDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1F2C] text-white border-white/10">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Username</Label>
            <p className="text-white/80">{user.username}</p>
          </div>
          <div>
            <Label>Email</Label>
            <p className="text-white/80">{user.email}</p>
          </div>
          <div>
            <Label>Full Name</Label>
            <p className="text-white/80">{`${user.first_name} ${user.last_name}`}</p>
          </div>
          <div>
            <Label>Status</Label>
            <p className="text-white/80">
              {user.is_active ? "Active" : "Inactive"}
            </p>
          </div>
          <div>
            <Label>Verified</Label>
            <p className="text-white/80">
              {user.is_verified ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <Label>Super User</Label>
            <p className="text-white/80">
              {user.is_superuser ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <Label>Created</Label>
            <p className="text-white/80">
              {new Date(user.created_at).toLocaleString()}
            </p>
          </div>
          <div>
            <Label>Last Updated</Label>
            <p className="text-white/80">
              {new Date(user.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};