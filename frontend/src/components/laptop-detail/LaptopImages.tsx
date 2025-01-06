interface LaptopImagesProps {
  image: string;
  extra_image?: string;
  name: string;
}

export const LaptopImages = ({ image, extra_image, name }: LaptopImagesProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      {extra_image && (
        <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
          <img
            src={extra_image}
            alt={`${name} additional view`}
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};