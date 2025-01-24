interface MonitorKeyFeaturesProps {
  diagonal?: number;
  panel_type?: string;
  resolution?: string;
  refresh_rate?: number;
  brightness?: number;
  response_time?: number;
}

const KeyFeature = ({ label, value }: { label: string; value?: string | number }) => {
  if (!value) return null;
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <dt className="text-sm font-medium text-gray-400">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-white">{value}</dd>
    </div>
  );
};

export const MonitorKeyFeatures = ({
  diagonal,
  panel_type,
  resolution,
  refresh_rate,
  brightness,
  response_time,
}: MonitorKeyFeaturesProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Key Features</h2>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {diagonal && panel_type && (
          <KeyFeature 
            label="Display" 
            value={`${diagonal}" ${panel_type}`} 
          />
        )}
        <KeyFeature label="Resolution" value={resolution} />
        {refresh_rate && <KeyFeature label="Refresh Rate" value={`${refresh_rate}Hz`} />}
        {brightness && <KeyFeature label="Brightness" value={`${brightness} nits`} />}
        {response_time && <KeyFeature label="Response Time" value={`${response_time}ms`} />}
      </dl>
    </div>
  );
};