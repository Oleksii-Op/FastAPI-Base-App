import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserData } from "@/types/user";

interface ProfileInfoProps {
  userData: UserData;
}

export const ProfileInfo = ({ userData }: ProfileInfoProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Profile Information</CardTitle>
        <CardDescription className="text-white/60">
          View and update your profile details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-white/80">First Name</label>
            <p className="mt-1 text-white">{userData.first_name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">Last Name</label>
            <p className="mt-1 text-white">{userData.last_name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">Username</label>
            <p className="mt-1 text-white">{userData.username}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">Email</label>
            <p className="mt-1 text-white">{userData.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">Phone Number</label>
            <p className="mt-1 text-white">{userData.phone_number || 'Not provided'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">Created at</label>
            <p className="mt-1 text-white">{formatDate(userData.created_at)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-white/80">Last Updated</label>
            <p className="mt-1 text-white">{formatDate(userData.updated_at)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};