import { useState } from "react";
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
import { Input } from "@/components/ui/input";

interface DeleteMonitorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  monitorId: string;
  monitorName: string;
  username: string;
  onConfirmDelete: () => void;
  onCancel: () => void;
}

export const DeleteMonitorDialog = ({
  isOpen,
  onOpenChange,
  monitorId,
  monitorName,
  username,
  onConfirmDelete,
  onCancel,
}: DeleteMonitorDialogProps) => {
  const [confirmUsername, setConfirmUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (confirmUsername !== username) {
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
          <AlertDialogTitle className="text-white">Delete Monitor Confirmation</AlertDialogTitle>
          <AlertDialogDescription className="text-white/80">
            Are you sure you want to delete monitor "{monitorName}" (ID: {monitorId})? 
            This action cannot be undone. This will permanently delete the monitor
            and remove all associated data.
          </AlertDialogDescription>
          <div className="space-y-2 mt-4">
            <p className="text-sm text-white/80">
              Please type "{username}" to confirm deletion:
            </p>
            <Input
              value={confirmUsername}
              onChange={(e) => {
                setConfirmUsername(e.target.value);
                setUsernameError(null);
              }}
              placeholder="Enter your username"
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
            disabled={confirmUsername !== username}
          >
            Delete Monitor
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};