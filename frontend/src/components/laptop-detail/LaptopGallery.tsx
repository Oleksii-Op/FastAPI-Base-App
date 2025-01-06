import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LaptopGalleryProps {
  mainImage: string;
  extraImage?: string;
  name: string;
}

export const LaptopGallery = ({ mainImage, extraImage, name }: LaptopGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(mainImage);
  const images = [mainImage, extraImage].filter(Boolean);

  const handlePrevious = () => {
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentImage(images[newIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentImage(images[newIndex]);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden group">
        <img
          src={currentImage}
          alt={name}
          className="w-full h-full object-contain"
        />
        {images.length > 1 && (
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
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(img)}
              className={`aspect-video w-24 rounded-md overflow-hidden border-2 transition-colors ${
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