import { RegisterForm } from "@/components/RegisterForm";
import { LoginForm } from "@/components/LoginForm";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AuthButtons } from "@/components/navigation/AuthButtons";
import { ProductMenu } from "@/components/navigation/ProductMenu";
import { Link } from "react-router-dom";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Footer } from "@/components/Footer";

type FormType = "login" | "register" | "forgotPassword" | "resetPassword";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState<FormType>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-[2000px] mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                TechHaven
              </h1>
              <Link 
                to="/" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                Main Page
              </Link>
              <ProductMenu />
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

      {/* Hero Section with Carousel */}
      <div className="relative pt-24 w-full">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Your Gateway to Tech Excellence
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover our premium selection of laptops
          </p>
          <ImageCarousel />
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Gaming Laptops */}
          <Link to="/laptops" className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Gaming Laptop"
                className="rounded-lg object-cover w-full h-48"
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Gaming Laptops
            </h3>
            <p className="text-gray-400 mb-4">
              High-performance gaming machines
            </p>
            <Button className="w-full">Explore</Button>
          </Link>

          {/* Study Laptops */}
          <Link to="/laptops" className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                alt="Study Laptop"
                className="rounded-lg object-cover w-full h-48"
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              For Studying
            </h3>
            <p className="text-gray-400 mb-4">
              Perfect for students and research
            </p>
            <Button className="w-full">Explore</Button>
          </Link>

          {/* Ultrabooks */}
          <Link to="/laptops" className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                alt="Ultrabook"
                className="rounded-lg object-cover w-full h-48"
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Ultrabooks
            </h3>
            <p className="text-gray-400 mb-4">
              Slim, lightweight, and powerful
            </p>
            <Button className="w-full">Explore</Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gradient-to-b from-gray-800 to-gray-900 py-16">
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

      {/* Brand Strips */}
      <div className="relative w-full overflow-hidden py-10 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="flex flex-col gap-8">
          {/* Strip moving left */}
          <div className="relative">
            <div className="animate-marquee-left flex whitespace-nowrap">
              <img 
                src="https://static.arvutitark.ee/public/media-hub-cms/2024/08/603813/at-logod-real-size-1.png" 
                alt="Brand Logos"
                className="h-12 object-contain brightness-0 invert opacity-30"
              />
              <img 
                src="https://static.arvutitark.ee/public/media-hub-cms/2024/08/603813/at-logod-real-size-1.png" 
                alt="Brand Logos"
                className="h-12 object-contain brightness-0 invert opacity-30"
              />
            </div>
          </div>
          
          {/* Strip moving right */}
          <div className="relative">
            <div className="animate-marquee-right flex whitespace-nowrap">
              <img 
                src="https://static.arvutitark.ee/public/media-hub-cms/2024/08/603813/at-logod-real-size-1.png" 
                alt="Brand Logos"
                className="h-12 object-contain brightness-0 invert opacity-30"
              />
              <img 
                src="https://static.arvutitark.ee/public/media-hub-cms/2024/08/603813/at-logod-real-size-1.png" 
                alt="Brand Logos"
                className="h-12 object-contain brightness-0 invert opacity-30"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
