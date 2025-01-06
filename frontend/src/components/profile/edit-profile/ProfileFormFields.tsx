import { Input } from "@/components/ui/input";

interface ProfileFormFieldsProps {
  username: string;
  firstName: string;
  lastName: string;
  errors: {
    username: string;
    firstName: string;
    lastName: string;
  };
  setUsername: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

export const ProfileFormFields = ({
  username,
  firstName,
  lastName,
  errors,
  setUsername,
  setFirstName,
  setLastName,
}: ProfileFormFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/80">Username</label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={`bg-[#1A1F2C] border-white/10 text-white ${errors.username ? 'border-red-500' : ''}`}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/80">First Name</label>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className={`bg-[#1A1F2C] border-white/10 text-white ${errors.firstName ? 'border-red-500' : ''}`}
        />
        {errors.firstName && (
          <p className="text-sm text-red-500">{errors.firstName}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/80">Last Name</label>
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className={`bg-[#1A1F2C] border-white/10 text-white ${errors.lastName ? 'border-red-500' : ''}`}
        />
        {errors.lastName && (
          <p className="text-sm text-red-500">{errors.lastName}</p>
        )}
      </div>
    </>
  );
};