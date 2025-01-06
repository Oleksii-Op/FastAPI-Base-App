import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const getStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1 w-full rounded-full transition-all duration-300",
              {
                "bg-red-500": strength >= level && strength === 1,
                "bg-orange-500": strength >= level && strength === 2,
                "bg-yellow-500": strength >= level && strength === 3,
                "bg-green-500": strength >= level && strength === 4,
                "bg-gray-200": strength < level,
              }
            )}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {strength === 0 && "Enter a password"}
        {strength === 1 && "Weak"}
        {strength === 2 && "Fair"}
        {strength === 3 && "Good"}
        {strength === 4 && "Strong"}
      </p>
    </div>
  );
};