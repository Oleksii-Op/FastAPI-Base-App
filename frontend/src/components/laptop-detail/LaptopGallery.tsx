import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LaptopGalleryProps {
  mainImage: string;
  extraImage?: string;
  additionalImages?: string[];
  name: string;
}

export const LaptopGallery = ({ mainImage, extraImage, additionalImages = [], name }: LaptopGalleryProps) => {
  const allImages = [mainImage, extraImage, ...additionalImages].filter(Boolean) as string[];
  const [currentImage, setCurrentImage] = useState(mainImage);

  const handlePrevious = () => {
    const currentIndex = allImages.indexOf(currentImage);
    const newIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    setCurrentImage(allImages[newIndex]);
  };

  const handleNext = () => {
    const currentIndex = allImages.indexOf(currentImage);
    const newIndex = currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentImage(allImages[newIndex]);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden group">
        <img
          src={currentImage}
          alt={name}
          className="w-full h-full object-contain"
        />
        {allImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(img)}
              className={`flex-shrink-0 aspect-video w-24 rounded-md overflow-hidden border-2 transition-colors ${
                currentImage === img ? "border-blue-500" : "border-transparent"
              }`}
            >
              <img src={img} alt={`${name} view ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};