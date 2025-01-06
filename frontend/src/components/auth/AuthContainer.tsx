import { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const AuthContainer = ({ children, title, description }: AuthContainerProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1F2C] p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1E2330] rounded-xl p-8 shadow-lg">
          {title && (
            <h2 className="text-2xl font-semibold text-white text-center mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-400 text-center mb-6">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};