import { useState } from "react";
import { UserData } from "@/types/user";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userToDelete: UserData | null;
  onConfirmDelete: () => void;
  onCancel: () => void;
}

export const DeleteUserDialog = ({
  isOpen,
  onOpenChange,
  userToDelete,
  onConfirmDelete,
  onCancel,
}: DeleteUserDialogProps) => {
  const [confirmUsername, setConfirmUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (confirmUsername !== userToDelete?.username) {
      setUsernameError("Username doesn't match");
      return;
    }
    onConfirmDelete();
  };

  const handleCancel = () => {
    setConfirmUsername("");
    setUsernameError(null);
    onCancel();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gray-900 border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete User Confirmation</AlertDialogTitle>
          <AlertDialogDescription className="text-white/80">
            Are you sure you want to delete user "{userToDelete?.username}"? 
            This action cannot be undone. This will permanently delete the user account
            and remove all associated data.
          </AlertDialogDescription>
          <div className="space-y-2 mt-4">
            <p className="text-sm text-white/80">
              Please type "{userToDelete?.username}" to confirm deletion:
            </p>
            <Input
              value={confirmUsername}
              onChange={(e) => {
                setConfirmUsername(e.target.value);
                setUsernameError(null);
              }}
              placeholder="Enter username"
              className="bg-gray-800 border-white/10 text-white"
            />
            {usernameError && (
              <p className="text-sm text-red-400">{usernameError}</p>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="bg-gray-800 hover:bg-gray-700 text-white border-0"
            onClick={handleCancel}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            className="bg-red-600 hover:bg-red-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={confirmUsername !== userToDelete?.username}
          >
            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};