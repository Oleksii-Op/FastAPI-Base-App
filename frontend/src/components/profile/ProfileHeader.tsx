import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Shield, UserCheck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { UserData } from "@/types/user";
import { EditProfileDialog } from "./EditProfileDialog";

interface ProfileHeaderProps {
  userData: UserData;
  onLogout: () => void;
  onProfileUpdate: () => void;
}

export const ProfileHeader = ({ userData, onLogout, onProfileUpdate }: ProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-32 w-32">
            <AvatarImage src={userData.avatar_url} />
            <AvatarFallback className="text-4xl">
              {userData.first_name?.[0]}{userData.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <Button 
            variant="outline" 
            className="w-full bg-white/10 text-white hover:bg-white/20 hover:text-white border-white/30"
          >
            Change Photo
          </Button>
          {(userData.is_active || userData.is_verified) && (
            <EditProfileDialog userData={userData} onProfileUpdate={onProfileUpdate} />
          )}
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <h1 className="text-3xl font-bold text-white">
              {userData.first_name} {userData.last_name}
            </h1>
            {userData.is_verified && (
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 flex items-center gap-1">
                <UserCheck className="h-4 w-4" />
                Verified Vendor
              </Badge>
            )}
            {userData.is_superuser && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Superuser
              </Badge>
            )}
            {userData.is_active && !userData.is_superuser && !userData.is_verified && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 flex items-center gap-1">
                <User className="h-4 w-4" />
                Active Buyer
              </Badge>
            )}
          </div>
          <p className="text-white/80">@{userData.username}</p>
          <p className="text-white/80">{userData.email}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="bg-white/10 text-white hover:bg-white/20 hover:text-white border-white/30"
            onClick={() => navigate('/')}
          >
            <Home className="mr-2 h-4 w-4" />
            To Main Page
          </Button>
          <Button
            variant="destructive"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};