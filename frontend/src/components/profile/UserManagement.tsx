import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { UserData } from "@/types/user";
import { UsersTable } from "./user-management/UsersTable";
import { ViewUserDialog } from "./user-management/ViewUserDialog";
import { EditUserDialog } from "./user-management/EditUserDialog";
import { UserIdInput } from "./user-management/UserIdInput";
import { DeleteUserDialog } from "./user-management/DeleteUserDialog";
import { ErrorDisplay } from "./user-management/ErrorDisplay";
import { UserFormData } from "./user-management/types";
import * as userService from "./user-management/userService";

export const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchedId, setLastSearchedId] = useState<number | null>(null);
  const [notFoundError, setNotFoundError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFetchUser = async (userId: number) => {
    setIsLoading(true);
    setLastSearchedId(userId);
    setNotFoundError(null);
    
    try {
      const user = await userService.fetchUserDetails(userId);
      const existingUserIndex = users.findIndex(u => u.id === user.id);
      
      if (existingUserIndex !== -1) {
        setUsers(prev => prev.map(u => u.id === user.id ? user : u));
      } else {
        setUsers(prev => [...prev, user]);
      }
      
      toast({
        title: "Success",
        description: "User fetched successfully",
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("User not found")) {
        setNotFoundError(`User with ID ${userId} was not found`);
        setUsers(prev => prev.filter(u => u.id !== userId));
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch user",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (userId: number, formData: UserFormData) => {
    setIsLoading(true);
    try {
      await userService.updateUser(userId, formData);
      await handleFetchUser(userId);
      setIsEditDialogOpen(false);
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    setIsLoading(true);
    try {
      await userService.deleteUser(userToDelete.id);
      setUsers(prev => prev.filter(user => user.id !== userToDelete.id));
      toast({
        title: "User Deleted",
        description: `User "${userToDelete.username}" has been successfully deleted.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete user",
      });
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">User Management</h2>
      
      <UserIdInput onFetchUser={handleFetchUser} isLoading={isLoading} />
      
      <ErrorDisplay error={notFoundError} />
      
      <UsersTable
        users={users}
        onView={(userId) => {
          const user = users.find(u => u.id === userId);
          if (user) {
            setSelectedUser(user);
            setIsViewDialogOpen(true);
          }
        }}
        onEdit={(user) => {
          setSelectedUser(user);
          setIsEditDialogOpen(true);
        }}
        onDelete={(user) => {
          setUserToDelete(user);
          setIsDeleteDialogOpen(true);
        }}
        isLoading={isLoading}
      />

      <ViewUserDialog
        user={selectedUser}
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
      />

      <EditUserDialog
        user={selectedUser}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleUpdateUser}
        isLoading={isLoading}
      />

      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        userToDelete={userToDelete}
        onConfirmDelete={handleDeleteUser}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setUserToDelete(null);
        }}
      />
    </div>
  );
};