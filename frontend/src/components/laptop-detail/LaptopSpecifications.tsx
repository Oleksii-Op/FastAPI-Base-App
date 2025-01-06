interface SpecificationProps {
  label: string;
  value?: string | number;
}

const Specification = ({ label, value }: SpecificationProps) => {
  if (!value) return null;
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}:</span>
      <span>{value}</span>
    </div>
  );
};

interface LaptopSpecificationsProps {
  diagonal?: string;
  screen_type?: string;
  resolution?: string;
  screen_frequency?: string;
  cpu_model?: string;
  gpu_model?: string;
  ram_size?: string;
  storage_size?: string;
  storage_type?: string;
}

export const LaptopSpecifications = ({
  diagonal,
  screen_type,
  resolution,
  screen_frequency,
  cpu_model,
  gpu_model,
  ram_size,
  storage_size,
  storage_type,
}: LaptopSpecificationsProps) => {
  return (
    <div className="bg-white/5 rounded-lg p-4 space-y-2">
      {diagonal && <Specification label="Screen" value={`${diagonal}" ${screen_type}`} />}
      <Specification label="Resolution" value={resolution} />
      <Specification label="Refresh Rate" value={screen_frequency} />
      <Specification label="Processor" value={cpu_model} />
      <Specification label="Graphics" value={gpu_model} />
      <Specification label="RAM" value={ram_size} />
      <Specification label="Storage" value={`${storage_size} ${storage_type}`} />
    </div>
  );
};