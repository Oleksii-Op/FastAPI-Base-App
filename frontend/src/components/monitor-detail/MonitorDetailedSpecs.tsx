interface MonitorDetailedSpecsProps {
  contrast_ratio?: string;
  aspect_ratio?: string;
  color_gamut?: number;
  hdmi_connection?: number;
  dp_connection?: number;
  jack_connection?: number;
  vga_connection?: number;
  usb_2?: number;
  usb_type_c?: number;
  usb_type_c_thunderbolt?: number;
  is_curved?: boolean;
  vesa_mounting?: string;
  has_speaker?: boolean;
  pivot?: boolean;
  is_adjustable_height?: boolean;
  has_touchscreen?: boolean;
  accessories?: string;
  energy_class?: string;
  width?: number;
  height?: number;
  depth?: number;
  weight?: number;
  warranty?: number;
}

const SpecSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <h4 className="font-medium text-blue-400 mb-2">{title}</h4>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

const SpecItem = ({ label, value }: { label: string; value?: string | number | boolean }) => {
  if (value === undefined || value === null || value === 0 || value === '') return null;
  
  let displayValue: string;
  if (typeof value === 'boolean') {
    displayValue = value ? 'Yes' : 'No';
  } else {
    displayValue = value.toString();
  }

  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}:</span>
      <span className="text-white">{displayValue}</span>
    </div>
  );
};

export const MonitorDetailedSpecs = (props: MonitorDetailedSpecsProps) => {
  const {
    contrast_ratio,
    aspect_ratio,
    color_gamut,
    hdmi_connection,
    dp_connection,
    jack_connection,
    vga_connection,
    usb_2,
    usb_type_c,
    usb_type_c_thunderbolt,
    is_curved,
    vesa_mounting,
    has_speaker,
    pivot,
    is_adjustable_height,
    has_touchscreen,
    accessories,
    energy_class,
    width,
    height,
    depth,
    weight,
    warranty,
  } = props;

  const hasDisplaySpecs = contrast_ratio || aspect_ratio || color_gamut;
  const hasConnectivity = hdmi_connection || dp_connection || jack_connection || vga_connection || 
                         usb_2 || usb_type_c || usb_type_c_thunderbolt;
  const hasFeatures = is_curved || vesa_mounting || has_speaker || pivot || 
                     is_adjustable_height || has_touchscreen;
  const hasPhysicalSpecs = width || height || depth || weight;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Detailed Specifications</h3>
      <div className="grid grid-cols-1 gap-4">
        {hasDisplaySpecs && (
          <SpecSection title="Display Specifications">
            <SpecItem label="Contrast Ratio" value={contrast_ratio} />
            <SpecItem label="Aspect Ratio" value={aspect_ratio} />
            <SpecItem label="Color Gamut" value={color_gamut ? `${color_gamut}%` : undefined} />
          </SpecSection>
        )}

        {hasConnectivity && (
          <SpecSection title="Connectivity">
            <SpecItem label="HDMI Ports" value={hdmi_connection} />
            <SpecItem label="DisplayPort" value={dp_connection} />
            <SpecItem label="Audio Jack" value={jack_connection} />
            <SpecItem label="VGA Port" value={vga_connection} />
            <SpecItem label="USB 2.0" value={usb_2} />
            <SpecItem label="USB Type-C" value={usb_type_c} />
            <SpecItem label="Thunderbolt" value={usb_type_c_thunderbolt} />
          </SpecSection>
        )}

        {hasFeatures && (
          <SpecSection title="Features">
            <SpecItem label="Curved Display" value={is_curved} />
            <SpecItem label="VESA Mount" value={vesa_mounting} />
            <SpecItem label="Built-in Speakers" value={has_speaker} />
            <SpecItem label="Pivot Support" value={pivot} />
            <SpecItem label="Height Adjustable" value={is_adjustable_height} />
            <SpecItem label="Touch Screen" value={has_touchscreen} />
          </SpecSection>
        )}

        {hasPhysicalSpecs && (
          <SpecSection title="Physical Specifications">
            <SpecItem label="Width" value={width ? `${width}mm` : undefined} />
            <SpecItem label="Height" value={height ? `${height}mm` : undefined} />
            <SpecItem label="Depth" value={depth ? `${depth}mm` : undefined} />
            <SpecItem label="Weight" value={weight ? `${weight}kg` : undefined} />
          </SpecSection>
        )}

        <SpecSection title="Additional Information">
          <SpecItem label="Warranty" value={warranty ? `${warranty} months` : undefined} />
          <SpecItem label="Energy Class" value={energy_class} />
          <SpecItem label="Accessories" value={accessories} />
        </SpecSection>
      </div>
    </div>
  );
};