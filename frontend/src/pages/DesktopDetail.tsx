import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DesktopBasicInfo } from "@/components/desktop-detail/DesktopBasicInfo";
import { DesktopKeyFeatures } from "@/components/desktop-detail/DesktopKeyFeatures";
import { DesktopDetailedSpecs } from "@/components/desktop-detail/DesktopDetailedSpecs";
import { DesktopImages } from "@/components/desktop-detail/DesktopImages";
import { Desktop } from "@/types/desktop";
import { AuthButtons } from "@/components/navigation/AuthButtons";
import { useState, useEffect } from "react";

export default function DesktopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const { data: desktop, isLoading, error } = useQuery({
    queryKey: ["desktop", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/desktops/get-desktop-by-uuid/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch desktop details");
      }
      return response.json() as Promise<Desktop>;
    },
  });

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/desktops/delete-desktop/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete desktop");
      }

      toast({
        title: "Success",
        description: "Desktop has been deleted successfully",
      });

      navigate("/desktops");
    } catch (error) {
      console.error("Error deleting desktop:", error);
      toast({
        title: "Error",
        description: "Failed to delete desktop",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !desktop) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-red-400">Error loading desktop details</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                TechHaven
              </h1>
            </div>
            <AuthButtons
              isAuthenticated={isAuthenticated}
              onLoginClick={() => setIsLoginOpen(true)}
              isLoginOpen={isLoginOpen}
              setIsLoginOpen={setIsLoginOpen}
            />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/desktops")}
              className="flex items-center gap-2 text-white hover:text-white/80"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Desktops
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/edit-desktop/${id}`)}
                className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white border-0 flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit Desktop
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Desktop
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the
                      desktop from the database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete Desktop</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <DesktopImages
              image={desktop.image}
              extra_images={desktop.images_url}
              name={desktop.name}
            />

            <div className="space-y-8">
              <DesktopBasicInfo
                name={desktop.name}
                description={desktop.description}
                price={desktop.price}
                is_available={desktop.is_available}
                maker={desktop.maker}
                id={desktop.id}
              />

              <DesktopKeyFeatures
                cpu_model={desktop.cpu_model}
                gpu_model={desktop.gpu_model}
                ram_size={desktop.ram_size}
                storage_size={desktop.storage_size}
                storage_type={desktop.storage_type}
                has_screen={desktop.has_screen}
                resolution={desktop.resolution}
                is_mini={desktop.is_mini}
              />

              <DesktopDetailedSpecs
                cpu_class={desktop.cpu_class}
                cpu_frequency={desktop.cpu_frequency}
                cpu_max_frequency={desktop.cpu_max_frequency}
                cpu_cores={desktop.cpu_cores}
                cpu_threads={desktop.cpu_threads}
                ram_type={desktop.ram_type}
                ram_frequency={desktop.ram_frequency}
                power_supply_name={desktop.power_supply_name}
                power_supply={desktop.power_supply}
                storage_connection={desktop.storage_connection}
                extra_hardware={desktop.extra_hardware}
                usb_a_2_0={desktop.usb_a_2_0}
                usb_a_3_1={desktop.usb_a_3_1}
                usb_type_c={desktop.usb_type_c}
                vga_connection={desktop.vga_connection}
                hdmi_connection={desktop.hdmi_connection}
                dp_connection={desktop.dp_connection}
                case_name={desktop.case_name}
                case_type={desktop.case_type}
                motherboard={desktop.motherboard}
                ethernet={desktop.ethernet}
                bluetooth={desktop.bluetooth}
                wireless={desktop.wireless}
                warranty={desktop.warranty}
                installed_os={desktop.installed_os}
                weight={desktop.weight}
                width={desktop.width}
                height={desktop.height}
                depth={desktop.depth}
                color={desktop.color}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}