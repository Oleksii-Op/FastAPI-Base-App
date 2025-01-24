import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthButtons } from "@/components/navigation/AuthButtons";
import { useState, useEffect } from "react";

interface ProductHeaderProps {
  title: string;
  returnPath: string;
}

export function ProductHeader({ title, returnPath }: ProductHeaderProps) {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
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
  );
}