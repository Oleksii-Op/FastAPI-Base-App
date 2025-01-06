import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CarouselDots } from "./carousel/CarouselDots";
import { CarouselSlide } from "./carousel/CarouselSlide";
import { CarouselImage } from "./carousel/types";

const carouselImages: CarouselImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    alt: "Premium Laptop Sale",
    link: "/laptops",
    overlayText: "Up to 30% off on Premium Laptops",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    alt: "MacBook Pro",
    link: "/products/macbook",
    overlayText: "New MacBook Pro - Power Unleashed",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Student Discount",
    link: "/student-deals",
    overlayText: "Special Student Discount - Save Big!",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    alt: "Developer Tools",
    link: "/developer-tools",
    overlayText: "Professional Developer Tools",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    alt: "Desktop Setup",
    link: "/desktop-setups",
    overlayText: "Complete Your Desktop Setup",
  },
];

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      startIndex: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const handleDotClick = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="w-full mx-auto px-4">
      <Carousel
        opts={{ 
          loop: true,
          align: "center",
          containScroll: "trimSnaps",
          slidesToScroll: 1,
          startIndex: 1,
        }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        className="w-full"
        ref={emblaRef}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {carouselImages.map((image) => (
            <CarouselSlide key={image.id} image={image} />
          ))}
        </CarouselContent>
      </Carousel>

      <CarouselDots 
        images={carouselImages}
        currentSlide={currentSlide}
        onDotClick={handleDotClick}
      />
    </div>
  );
}