import { useQuery } from "@tanstack/react-query";
import { LaptopCard } from "@/components/LaptopCard";
import { LaptopPreview } from "@/types/laptop";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { AuthButtons } from "@/components/navigation/AuthButtons";
import { BrandSection } from "@/components/BrandSection";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";

export default function Laptops() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [offset, setOffset] = useState(0);
  const [allLaptops, setAllLaptops] = useState<LaptopPreview[]>([]);
  const limit = 25;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const { data: laptops, isLoading, error, isFetching } = useQuery({
    queryKey: ["laptops", offset],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/laptops/get-laptops-preview/?offset=${offset}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch laptops");
      }
      const newLaptops = await response.json();
      return newLaptops;
    },
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (laptops && !isLoading) {
      setAllLaptops(prev => [...prev, ...laptops]);
    }
  }, [laptops, isLoading]);

  const loadMore = () => {
    setOffset(prev => prev + limit);
  };

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load laptops. Please try again later.",
    });
  }

  const showLoadMoreButton = laptops?.length === limit;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Navigation */}
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

      {/* Main Content */}
      <div className="pt-24 w-full">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">Our Laptops</h1>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Main Page
            </Button>
          </div>
          
          {isLoading && offset === 0 ? (
            <div className="text-center text-white">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              Loading laptops...
            </div>
          ) : !allLaptops || allLaptops.length === 0 ? (
            <div className="text-center text-white text-xl">No Items Found</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {allLaptops.map((laptop: LaptopPreview) => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
              
              {showLoadMoreButton && (
                <div className="mt-8 text-center transition-opacity duration-300">
                  <Button
                    onClick={loadMore}
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/20 transition-colors"
                    disabled={isFetching}
                  >
                    {isFetching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading more laptops...
                      </>
                    ) : (
                      "More Laptops"
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gradient-to-b from-gray-800 to-gray-900 py-16 mt-20">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-400">On orders over $100</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-400">Expert assistance anytime</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-400">100% secure transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Section and Footer */}
      <div>
        <BrandSection />
        <Footer />
      </div>
    </div>
  );
}