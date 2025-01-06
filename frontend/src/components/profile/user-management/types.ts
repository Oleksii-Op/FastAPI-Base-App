import { UserData } from "@/types/user";

export interface UserTableProps {
  users: UserData[];
  onView: (userId: number) => void;
  onEdit: (user: UserData) => void;
  onDelete: (user: UserData) => void;
  isLoading: boolean;
}

export interface UserDialogProps {
  user: UserData | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface UserFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}