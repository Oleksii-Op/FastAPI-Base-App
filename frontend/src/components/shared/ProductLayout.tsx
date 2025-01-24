import { AuthButtons } from "@/components/navigation/AuthButtons";
import { BrandSection } from "@/components/BrandSection";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";

interface ProductLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function ProductLayout({ children, title }: ProductLayoutProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800">
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

      <div className="pt-24 w-full">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>

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

      <BrandSection />
      <Footer />
    </div>
  );
}