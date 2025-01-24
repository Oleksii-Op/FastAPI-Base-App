import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AuthButtons } from "@/components/navigation/AuthButtons";
import { useState, useEffect } from "react";
import { LaptopHeader } from "@/components/laptop-detail/LaptopHeader";
import { LaptopGallery } from "@/components/laptop-detail/LaptopGallery";
import { LaptopKeyFeatures } from "@/components/laptop-detail/LaptopKeyFeatures";
import { LaptopDetailedSpecs } from "@/components/laptop-detail/LaptopDetailedSpecs";
import { BrandSection } from "@/components/BrandSection";
import { Footer } from "@/components/Footer";
import { LaptopDetail as LaptopDetailType } from "@/types/laptop";
import { DeleteLaptopDialog } from "@/components/laptop-detail/DeleteLaptopDialog";
import { LaptopNavigation } from "@/components/laptop-detail/LaptopNavigation";
import { LaptopActions } from "@/components/laptop-detail/LaptopActions";

export default function LaptopDetail() {
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

  const { data: laptop, isLoading, error } = useQuery({
    queryKey: ["laptop", id],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/laptops/get-laptop-by-uuid/${id}`,
        { headers }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Laptop not found");
        }
        throw new Error("Failed to fetch laptop details");
      }
      return response.json() as Promise<LaptopDetailType>;
    },
  });

  const handleDeleteLaptop = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/laptops/delete-laptop/${id}`,
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
          description: "Laptop deleted successfully",
        });
        navigate("/laptops");
      } else {
        throw new Error("Failed to delete laptop");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete laptop",
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
          <LaptopNavigation onBack={() => navigate("/laptops")} />
          <p className="text-red-400">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  if (!laptop) return null;

  const canDeleteLaptop = userData?.is_superuser || userData?.is_verified;

  const mainImage = laptop.images_url?.[0]?.url || laptop.image;
  const additionalImages = laptop.images_url?.slice(1).map(img => img.url) || [];

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
            <LaptopNavigation onBack={() => navigate("/laptops")} />
            {isAuthenticated && (
              <LaptopActions
                id={id!}
                canDeleteLaptop={canDeleteLaptop}
                onDelete={() => setIsDeleteDialogOpen(true)}
              />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <LaptopGallery
              mainImage={mainImage}
              additionalImages={additionalImages}
              name={laptop.name}
            />

            <div className="space-y-8">
              <LaptopHeader
                name={laptop.name}
                description={laptop.description}
                price={laptop.price}
                is_available={laptop.is_available}
                maker={laptop.maker}
                id={laptop.id}
              />

              <LaptopKeyFeatures
                screen_type={laptop.screen_type}
                diagonal={laptop.diagonal?.toString()}
                resolution={laptop.resolution}
                cpu_model={laptop.cpu_model}
                ram_size={laptop.ram_size?.toString()}
                storage_size={laptop.storage_size?.toString()}
                storage_type={laptop.storage_type}
                gpu_model={laptop.gpu_model}
              />

              <LaptopDetailedSpecs
                cpu_class={laptop.cpu_class}
                cpu_frequency={laptop.cpu_frequency?.toString()}
                cpu_cores={laptop.cpu_cores}
                cpu_threads={laptop.cpu_threads}
                gpu_memory={laptop.gpu_memory}
                gpu_memory_type={laptop.gpu_memory_type}
                ram_type={laptop.ram_type}
                ram_frequency={laptop.ram_frequency}
                warranty={laptop.warranty}
                installed_os={laptop.installed_os}
                weight={laptop.weight}
                color={laptop.color}
              />
            </div>
          </div>
        </div>
      </main>

      {userData && (
        <DeleteLaptopDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          laptopId={id || ""}
          laptopName={laptop.name}
          username={userData.username}
          onConfirmDelete={handleDeleteLaptop}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      )}

      <BrandSection />
      <Footer />
    </div>
  );
}
