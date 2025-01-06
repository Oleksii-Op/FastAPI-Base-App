interface KeyFeatureProps {
  label: string;
  value?: string | number;
}

const KeyFeature = ({ label, value }: KeyFeatureProps) => {
  if (!value) return null;
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <dt className="text-sm font-medium text-gray-400">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-white">{value}</dd>
    </div>
  );
};

interface LaptopKeyFeaturesProps {
  screen_type?: string;
  diagonal?: string;
  resolution?: string;
  cpu_model?: string;
  ram_size?: string;
  storage_size?: string;
  storage_type?: string;
  gpu_model?: string;
}

export const LaptopKeyFeatures = ({
  screen_type,
  diagonal,
  resolution,
  cpu_model,
  ram_size,
  storage_size,
  storage_type,
  gpu_model,
}: LaptopKeyFeaturesProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Key Features</h2>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {diagonal && (
          <KeyFeature 
            label="Display" 
            value={`${diagonal}" ${screen_type}`} 
          />
        )}
        <KeyFeature label="Resolution" value={resolution} />
        <KeyFeature label="Processor" value={cpu_model} />
        <KeyFeature label="Memory" value={ram_size} />
        <KeyFeature 
          label="Storage" 
          value={storage_size && storage_type ? `${storage_size} ${storage_type}` : undefined} 
        />
        <KeyFeature label="Graphics" value={gpu_model} />
      </dl>
    </div>
  );
};