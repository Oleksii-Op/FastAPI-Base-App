import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { UserData } from "@/types/user";
import { ProfileFormFields } from "./edit-profile/ProfileFormFields";
import { validateField } from "./edit-profile/validation";

interface EditProfileDialogProps {
  userData: UserData;
  onProfileUpdate: () => void;
}

export const EditProfileDialog = ({ userData, onProfileUpdate }: EditProfileDialogProps) => {
  const [username, setUsername] = useState(userData.username);
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      username: validateField('username', username)
    }));
  }, [username]);

  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      firstName: validateField('firstName', firstName)
    }));
  }, [firstName]);

  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      lastName: validateField('lastName', lastName)
    }));
  }, [lastName]);

  const validateFields = () => {
    const newErrors = {
      username: validateField('username', username),
      firstName: validateField('firstName', firstName),
      lastName: validateField('lastName', lastName),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateFields()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please check the form for errors",
      });
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/me`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
        setIsOpen(false);
        onProfileUpdate();
      } else {
        const error = await response.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: error.detail || "Failed to update profile",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while updating profile",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full bg-white/10 text-white hover:bg-white/20 hover:text-white border-white/30">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1F2C] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ProfileFormFields
            username={username}
            firstName={firstName}
            lastName={lastName}
            errors={errors}
            setUsername={setUsername}
            setFirstName={setFirstName}
            setLastName={setLastName}
          />
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};