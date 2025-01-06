export interface UserData {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  updated_at: string;
  created_at: string;
  phone_number: string;
  avatar_url?: string;
}