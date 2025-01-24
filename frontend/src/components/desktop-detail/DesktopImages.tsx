interface DesktopImagesProps {
  image: string;
  extra_images?: { url: string }[];
  name: string;
}

export const DesktopImages = ({ image, extra_images, name }: DesktopImagesProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      {extra_images && extra_images.map((img, index) => (
        <div key={index} className="aspect-video bg-black/20 rounded-lg overflow-hidden">
          <img
            src={img.url}
            alt={`${name} additional view ${index + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};