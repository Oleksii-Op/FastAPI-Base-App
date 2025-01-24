import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ResetPasswordDialog = ({ isOpen, onClose, onSuccess }: ResetPasswordDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: data.token,
          password: data.password,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your password has been reset successfully.",
        });
        onSuccess();
      } else if (response.status === 400) {
        const error = await response.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: error.detail === "RESET_PASSWORD_BAD_TOKEN" 
            ? "Invalid reset token. Please try again." 
            : "Failed to reset password.",
        });
      } else if (response.status === 422) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please check your input and try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[400px] bg-[#1A1B1E] border-gray-800">
        <DialogTitle className="text-2xl font-semibold text-white text-center">
          Reset Password
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Input
              {...register("token")}
              placeholder="Reset Token"
              className="bg-[#FAFAD2]/10 border-0 text-white placeholder:text-gray-400"
            />
            {errors.token && (
              <p className="text-sm text-red-500 mt-1">{errors.token.message}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Input
                {...register("password")}
                type="password"
                placeholder="Create new password"
                className="bg-[#FAFAD2]/10 border-0 text-white placeholder:text-gray-400"
              />
              <PasswordStrengthIndicator password={password || ""} />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="Repeat new password"
                className="bg-[#FAFAD2]/10 border-0 text-white placeholder:text-gray-400"
              />
              {confirmPassword && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {passwordsMatch ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
            {confirmPassword && !errors.confirmPassword && (
              <p className="text-sm mt-1 text-gray-400">
                {passwordsMatch ? (
                  <span className="text-green-500">Passwords match</span>
                ) : (
                  <span className="text-red-500">Passwords don't match</span>
                )}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};