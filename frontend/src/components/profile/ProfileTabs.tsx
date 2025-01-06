import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, Bell, Shield, MessageSquare, Laptop, Users } from "lucide-react";
import { UserData } from "@/types/user";
import { MyLaptops } from "./MyLaptops";
import { ProfileInfo } from "./ProfileInfo";
import { MessagesTab } from "./MessagesTab";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { UserManagement } from "./UserManagement";

interface ProfileTabsProps {
  userData: UserData;
}

export const ProfileTabs = ({ userData }: ProfileTabsProps) => {
  const showLaptopsTab = userData.is_superuser || userData.is_verified;

  return (
    <Tabs defaultValue="profile" className="p-8">
      <TabsList className={`grid w-full ${userData.is_superuser ? 'grid-cols-7' : showLaptopsTab ? 'grid-cols-6' : 'grid-cols-5'} bg-white/5 border border-white/10`}>
        <TabsTrigger value="profile" className="text-white data-[state=active]:bg-white/10">
          <User className="mr-2 h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="settings" className="text-white data-[state=active]:bg-white/10">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-white/10">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security" className="text-white data-[state=active]:bg-white/10">
          <Shield className="mr-2 h-4 w-4" />
          Security
        </TabsTrigger>
        <TabsTrigger value="messages" className="text-white data-[state=active]:bg-white/10">
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </TabsTrigger>
        {showLaptopsTab && (
          <TabsTrigger value="my-laptops" className="text-white data-[state=active]:bg-white/10">
            <Laptop className="mr-2 h-4 w-4" />
            My Laptops
          </TabsTrigger>
        )}
        {userData.is_superuser && (
          <TabsTrigger value="users" className="text-white data-[state=active]:bg-white/10">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="profile">
        <ProfileInfo userData={userData} />
      </TabsContent>

      <TabsContent value="settings">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Settings</CardTitle>
            <CardDescription className="text-white/60">
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              Settings content coming soon...
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Notifications</CardTitle>
            <CardDescription className="text-white/60">
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              Notifications content coming soon...
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Security</CardTitle>
            <CardDescription className="text-white/60">
              Manage your security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ChangePasswordDialog userData={userData} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="messages">
        <MessagesTab />
      </TabsContent>

      {showLaptopsTab && (
        <TabsContent value="my-laptops">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <MyLaptops />
            </CardContent>
          </Card>
        </TabsContent>
      )}

      {userData.is_superuser && (
        <TabsContent value="users">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  );
};
