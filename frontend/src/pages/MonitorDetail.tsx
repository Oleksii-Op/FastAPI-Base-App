import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AuthButtons } from "@/components/navigation/AuthButtons";
import { useState, useEffect } from "react";
import { BrandSection } from "@/components/BrandSection";
import { Footer } from "@/components/Footer";
import { MonitorDetail as MonitorDetailType } from "@/types/monitor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MonitorImages } from "@/components/monitor-detail/MonitorImages";
import { MonitorBasicInfo } from "@/components/monitor-detail/MonitorBasicInfo";
import { MonitorKeyFeatures } from "@/components/monitor-detail/MonitorKeyFeatures";
import { MonitorDetailedSpecs } from "@/components/monitor-detail/MonitorDetailedSpecs";
import { MonitorActions } from "@/components/monitor-detail/MonitorActions";
import { DeleteMonitorDialog } from "@/components/monitor-detail/DeleteMonitorDialog";

export default function MonitorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userData, setUserData] = useState<{ username: string; is_superuser: boolean; is_verified: boolean } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
    
    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setUserData(data);
        })
        .catch(console.error);
    }
  }, []);

  const { data: monitor, isLoading, error } = useQuery({
    queryKey: ["monitor", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/monitors/get-monitor-by-uuid/${id}`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Monitor not found");
        }
        throw new Error("Failed to fetch monitor details");
      }
      return response.json() as Promise<MonitorDetailType>;
    },
  });

  const handleDeleteMonitor = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/monitors/delete-monitor/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Monitor deleted successfully",
        });
        navigate("/monitors");
      } else {
        throw new Error("Failed to delete monitor");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete monitor",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/monitors')}
            className="mb-4 text-white hover:text-white/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Monitors
          </Button>
          <p className="text-red-400">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  if (!monitor) return null;

  const canDeleteMonitor = userData?.is_superuser || userData?.is_verified;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
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
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/monitors')}
              className="text-white hover:text-white/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Monitors
            </Button>
            {isAuthenticated && (
              <MonitorActions
                id={id!}
                canDeleteMonitor={canDeleteMonitor}
                onDelete={() => setIsDeleteDialogOpen(true)}
              />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <MonitorImages
              image={monitor.image}
              extra_images={monitor.images_url?.map(img => img.url)}
              name={monitor.name}
            />

            <div className="space-y-8">
              <MonitorBasicInfo
                name={monitor.name}
                maker={monitor.maker}
                id={monitor.id}
                price={monitor.price}
                is_available={monitor.is_available}
                description={monitor.description}
              />

              <MonitorKeyFeatures
                diagonal={monitor.diagonal}
                panel_type={monitor.panel_type}
                resolution={monitor.resolution}
                refresh_rate={monitor.refresh_rate}
                brightness={monitor.brightness}
                response_time={monitor.response_time}
              />

              <MonitorDetailedSpecs
                contrast_ratio={monitor.contrast_ratio}
                aspect_ratio={monitor.aspect_ratio}
                color_gamut={monitor.color_gamut}
                hdmi_connection={monitor.hdmi_connection}
                dp_connection={monitor.dp_connection}
                jack_connection={monitor.jack_connection}
                vga_connection={monitor.vga_connection}
                usb_2={monitor.usb_2}
                usb_type_c={monitor.usb_type_c}
                usb_type_c_thunderbolt={monitor.usb_type_c_thunderbolt}
                is_curved={monitor.is_curved}
                vesa_mounting={monitor.vesa_mounting}
                has_speaker={monitor.has_speaker}
                pivot={monitor.pivot}
                is_adjustable_height={monitor.is_adjustable_height}
                has_touchscreen={monitor.has_touchscreen}
                accessories={monitor.accessories}
                energy_class={monitor.energy_class}
                width={monitor.width}
                height={monitor.height}
                depth={monitor.depth}
                weight={monitor.weight}
                warranty={monitor.warranty}
              />
            </div>
          </div>
        </div>
      </main>

      {userData && (
        <DeleteMonitorDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          monitorId={id || ""}
          monitorName={monitor.name}
          username={userData.username}
          onConfirmDelete={handleDeleteMonitor}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      )}

      <BrandSection />
      <Footer />
    </div>
  );
}