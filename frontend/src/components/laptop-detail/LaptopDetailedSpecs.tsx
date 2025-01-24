interface DetailedSpecsProps {
  cpu_class?: string;
  cpu_frequency?: string;
  cpu_cores?: number;
  cpu_threads?: number;
  gpu_memory?: number;
  gpu_memory_type?: string;
  ram_type?: string;
  ram_frequency?: number;
  hardware_type?: string;
  warranty?: number;
  installed_os?: string;
  weight?: number;
  color?: string;
}

export const LaptopDetailedSpecs = (props: DetailedSpecsProps) => {
  const {
    cpu_class,
    cpu_frequency,
    cpu_cores,
    cpu_threads,
    gpu_memory,
    gpu_memory_type,
    ram_type,
    ram_frequency,
    hardware_type,
    warranty,
    installed_os,
    weight,
    color,
  } = props;

  const hasProcessorDetails = cpu_class || cpu_frequency || cpu_cores || cpu_threads;
  const hasGraphicsDetails = gpu_memory || gpu_memory_type;
  const hasMemoryDetails = ram_type || ram_frequency;
  const hasAdditionalInfo = hardware_type || warranty || installed_os || weight || color;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Detailed Specifications</h3>
      <div className="grid grid-cols-1 gap-4">
        {hasProcessorDetails && (
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-2">Processor</h4>
            <div className="space-y-2">
              {cpu_class && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Class:</span>
                  <span className="text-white">{cpu_class}</span>
                </div>
              )}
              {cpu_frequency && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Frequency:</span>
                  <span className="text-white">{cpu_frequency} GHz</span>
                </div>
              )}
              {cpu_cores && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Cores:</span>
                  <span className="text-white">{cpu_cores}</span>
                </div>
              )}
              {cpu_threads && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Threads:</span>
                  <span className="text-white">{cpu_threads}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {hasGraphicsDetails && (
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-2">Graphics</h4>
            <div className="space-y-2">
              {gpu_memory && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory:</span>
                  <span className="text-white">{gpu_memory} GB</span>
                </div>
              )}
              {gpu_memory_type && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory Type:</span>
                  <span className="text-white">{gpu_memory_type}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {hasMemoryDetails && (
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-2">Memory</h4>
            <div className="space-y-2">
              {ram_type && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white">{ram_type}</span>
                </div>
              )}
              {ram_frequency && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Frequency:</span>
                  <span className="text-white">{ram_frequency}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {hasAdditionalInfo && (
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-2">Additional Information</h4>
            <div className="space-y-2">
              {hardware_type && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Hardware Type:</span>
                  <span className="text-white">{hardware_type}</span>
                </div>
              )}
              {warranty && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="text-white">{warranty} months</span>
                </div>
              )}
              {installed_os && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Operating System:</span>
                  <span className="text-white">{installed_os}</span>
                </div>
              )}
              {weight && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Weight:</span>
                  <span className="text-white">{weight}kg</span>
                </div>
              )}
              {color && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Color:</span>
                  <span className="text-white">{color}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};