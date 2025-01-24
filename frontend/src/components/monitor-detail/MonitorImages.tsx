interface MonitorImagesProps {
  image: string;
  extra_images?: string[];
  name: string;
}

export const MonitorImages = ({ image, extra_images, name }: MonitorImagesProps) => {
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
            src={img}
            alt={`${name} additional view ${index + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};