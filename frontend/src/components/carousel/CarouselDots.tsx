import { cn } from "@/lib/utils";

interface CarouselDotsProps {
  images: { id: number }[];
  currentSlide: number;
  onDotClick: (index: number) => void;
}

export function CarouselDots({ images, currentSlide, onDotClick }: CarouselDotsProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            currentSlide === index
              ? "bg-primary scale-110"
              : "bg-gray-400 hover:bg-gray-600"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}