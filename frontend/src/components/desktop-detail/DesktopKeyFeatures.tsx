interface DesktopKeyFeaturesProps {
  cpu_model?: string;
  gpu_model?: string;
  ram_size?: number;
  storage_size?: number;
  storage_type?: string;
  has_screen?: boolean;
  resolution?: string;
  is_mini?: boolean;
}

export const DesktopKeyFeatures = ({
  cpu_model,
  gpu_model,
  ram_size,
  storage_size,
  storage_type,
  has_screen,
  resolution,
  is_mini,
}: DesktopKeyFeaturesProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Key Features</h2>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cpu_model && (
          <div className="bg-white/5 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-400">Processor</dt>
            <dd className="mt-1 text-lg font-semibold text-white">{cpu_model}</dd>
          </div>
        )}
        {gpu_model && (
          <div className="bg-white/5 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-400">Graphics</dt>
            <dd className="mt-1 text-lg font-semibold text-white">{gpu_model}</dd>
          </div>
        )}
        {ram_size && (
          <div className="bg-white/5 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-400">Memory</dt>
            <dd className="mt-1 text-lg font-semibold text-white">{ram_size} GB</dd>
          </div>
        )}
        {storage_size && storage_type && (
          <div className="bg-white/5 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-400">Storage</dt>
            <dd className="mt-1 text-lg font-semibold text-white">{storage_size} GB {storage_type}</dd>
          </div>
        )}
        {has_screen && resolution && (
          <div className="bg-white/5 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-400">Display</dt>
            <dd className="mt-1 text-lg font-semibold text-white">{resolution}</dd>
          </div>
        )}
        {is_mini && (
          <div className="bg-white/5 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-400">Form Factor</dt>
            <dd className="mt-1 text-lg font-semibold text-white">Mini PC</dd>
          </div>
        )}
      </dl>
    </div>
  );
};