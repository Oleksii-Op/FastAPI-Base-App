import { CarouselImage } from "./types";
import { CarouselItem } from "@/components/ui/carousel";

interface CarouselSlideProps {
  image: CarouselImage;
}

export function CarouselSlide({ image }: CarouselSlideProps) {
  return (
    <CarouselItem className="basis-[85%] pl-2 md:pl-4 transition-all duration-200 ease-in-out">
      <a
        href={image.link}
        className="relative block w-full h-[300px] group overflow-hidden rounded-lg"
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
        {image.overlayText && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
            <p className="text-white text-lg sm:text-xl font-semibold">
              {image.overlayText}
            </p>
          </div>
        )}
      </a>
    </CarouselItem>
  );
}