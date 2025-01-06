import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { useState } from "react";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
}

type ViewType = 'login' | 'register' | 'forgotPassword';

export const AuthButtons = ({ 
  isAuthenticated, 
  onLoginClick, 
  isLoginOpen, 
  setIsLoginOpen 
}: AuthButtonsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<ViewType>('login');

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json"
        },
      });

      if (response.ok) {
        localStorage.removeItem("accessToken");
        toast({
          title: "Success",
          description: "You have been logged out successfully",
        });
        window.location.reload();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout",
      });
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'register':
        return (
          <>
            <h2 className="text-2xl font-semibold text-white text-center">
              Create an account
            </h2>
            <p className="text-gray-400 text-center mt-1 mb-6">
              Enter your details to sign up
            </p>
            <RegisterForm />
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="text-blue-500 hover:text-blue-400 p-0 ml-1"
                  onClick={() => setCurrentView('login')}
                >
                  Sign in
                </Button>
              </p>
            </div>
          </>
        );
      case 'forgotPassword':
        return (
          <>
            <h2 className="text-2xl font-semibold text-white text-center">
              Reset Password
            </h2>
            <p className="text-gray-400 text-center mt-1 mb-6">
              Enter your email to receive reset instructions
            </p>
            <ForgotPasswordForm onCancel={() => setCurrentView('login')} />
          </>
        );
      default:
        return (
          <>
            <h2 className="text-2xl font-semibold text-white text-center">
              Welcome back
            </h2>
            <p className="text-gray-400 text-center mt-1 mb-6">
              Enter your credentials to continue
            </p>
            <LoginForm />
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="text-blue-500 hover:text-blue-400 p-0 ml-1"
                  onClick={() => setCurrentView('register')}
                >
                  Sign up
                </Button>
              </p>
              <Button 
                variant="link" 
                className="text-gray-400 hover:text-gray-300 text-sm mt-2"
                onClick={() => setCurrentView('forgotPassword')}
              >
                Forgot your password?
              </Button>
            </div>
          </>
        );
    }
  };

  if (isAuthenticated) {
    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="bg-white/10 text-white hover:bg-white/20 border-white/30"
          onClick={() => navigate("/profile")}
        >
          <User className="mr-2 h-4 w-4" />
          View Profile
        </Button>
        <Button
          variant="destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-white/10 text-white hover:bg-white/20 border-white/30"
          onClick={onLoginClick}
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px] bg-[#1A1B1E] border-gray-800 p-0">
        <div className="p-6">
          {renderView()}
        </div>
      </DialogContent>
    </Dialog>
  );
};