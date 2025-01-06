export const BrandSection = () => {
  return (
    <div className="w-full bg-[#0F0B1B]">
      <div className="relative w-full overflow-hidden py-10 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="flex flex-col gap-8">
          {/* Strip moving left */}
          <div className="relative">
            <div className="animate-marquee-left flex whitespace-nowrap">
              <img 
                src="https://static.arvutitark.ee/public/media-hub-cms/2024/08/603813/at-logod-real-size-1.png" 
                alt="Brand Logos"
                className="h-12 object-contain brightness-0 invert opacity-30"
              />
              <img 
                src="https://static.arvutitark.ee/public/media-hub-cms/2024/08/603813/at-logod-real-size-1.png" 
                alt="Brand Logos"
                className="h-12 object-contain brightness-0 invert opacity-30"
              />
            </div>
          </div>
          
          {/* Strip moving right */}
          <div className="relative">
            <div className="animate-marquee-right flex whitespace-nowrap">
              <img 
                src="https://static.arvutitark.ee/public/media-hub-cms/2024/08/603813/at-logod-real-size-1.png" 
                alt="Brand Logos"
                className="h-12 object-contain brightness-0 invert opacity-30"
              />
              <img 
                src="https://static.arvutitark.ee/public/media-hub-cms/2024/08/603813/at-logod-real-size-1.png" 
                alt="Brand Logos"
                className="h-12 object-contain brightness-0 invert opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};