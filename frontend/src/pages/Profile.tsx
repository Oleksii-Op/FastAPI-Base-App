import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { UserData } from "@/types/user";

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchUserData = async () => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      navigate("/");
      return;
    }

    try {
      console.log("Fetching user data with token:", token);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/me`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User data received:", data);
        setUserData(data);
      } else if (response.status === 401) {
        console.log("Unauthorized - clearing token");
        localStorage.removeItem("accessToken");
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Please log in again",
        });
        navigate("/");
      } else {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
      });

      if (response.ok) {
        localStorage.removeItem("accessToken");
        toast({
          title: "Success",
          description: "You have been logged out successfully",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout",
      });
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#1A1F2C] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="glass-panel rounded-xl shadow-lg overflow-hidden bg-white/5 backdrop-blur-md border border-white/10">
          <ProfileHeader 
            userData={userData} 
            onLogout={handleLogout} 
            onProfileUpdate={fetchUserData}
          />
          <ProfileTabs userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;