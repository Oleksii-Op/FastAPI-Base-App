interface DesktopDetailedSpecsProps {
  cpu_class?: string;
  cpu_frequency?: number;
  cpu_max_frequency?: number;
  cpu_cores?: number;
  cpu_threads?: number;
  ram_type?: string;
  ram_frequency?: number;
  power_supply_name?: string;
  power_supply?: number;
  storage_connection?: string;
  extra_hardware?: string;
  usb_a_2_0?: number;
  usb_a_3_1?: number;
  usb_type_c?: number;
  vga_connection?: number;
  hdmi_connection?: number;
  dp_connection?: number;
  case_name?: string;
  case_type?: string;
  motherboard?: string;
  ethernet?: number;
  bluetooth?: string;
  wireless?: string;
  warranty?: number;
  installed_os?: string;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
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

const SpecItem = ({ label, value }: { label: string; value?: string | number }) => {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}:</span>
      <span className="text-white">{value}</span>
    </div>
  );
};

export const DesktopDetailedSpecs = (props: DesktopDetailedSpecsProps) => {
  const {
    cpu_class,
    cpu_frequency,
    cpu_max_frequency,
    cpu_cores,
    cpu_threads,
    ram_type,
    ram_frequency,
    power_supply_name,
    power_supply,
    storage_connection,
    extra_hardware,
    usb_a_2_0,
    usb_a_3_1,
    usb_type_c,
    vga_connection,
    hdmi_connection,
    dp_connection,
    case_name,
    case_type,
    motherboard,
    ethernet,
    bluetooth,
    wireless,
    warranty,
    installed_os,
    weight,
    width,
    height,
    depth,
    color,
  } = props;

  const hasProcessorDetails = cpu_class || cpu_frequency || cpu_max_frequency || cpu_cores || cpu_threads;
  const hasMemoryDetails = ram_type || ram_frequency;
  const hasPowerDetails = power_supply_name || power_supply;
  const hasConnectivity = usb_a_2_0 || usb_a_3_1 || usb_type_c || vga_connection || hdmi_connection || dp_connection;
  const hasNetworking = ethernet || bluetooth || wireless;
  const hasPhysicalSpecs = weight || width || height || depth;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Detailed Specifications</h3>
      <div className="grid grid-cols-1 gap-4">
        {hasProcessorDetails && (
          <SpecSection title="Processor Specifications">
            <SpecItem label="Class" value={cpu_class} />
            <SpecItem label="Base Frequency" value={cpu_frequency ? `${cpu_frequency} GHz` : undefined} />
            <SpecItem label="Max Frequency" value={cpu_max_frequency ? `${cpu_max_frequency} GHz` : undefined} />
            <SpecItem label="Cores" value={cpu_cores} />
            <SpecItem label="Threads" value={cpu_threads} />
          </SpecSection>
        )}

        {hasMemoryDetails && (
          <SpecSection title="Memory">
            <SpecItem label="Type" value={ram_type} />
            <SpecItem label="Frequency" value={ram_frequency ? `${ram_frequency} MHz` : undefined} />
          </SpecSection>
        )}

        {hasPowerDetails && (
          <SpecSection title="Power Supply">
            <SpecItem label="Model" value={power_supply_name} />
            <SpecItem label="Wattage" value={power_supply ? `${power_supply}W` : undefined} />
          </SpecSection>
        )}

        {storage_connection && (
          <SpecSection title="Storage">
            <SpecItem label="Connection" value={storage_connection} />
          </SpecSection>
        )}

        {hasConnectivity && (
          <SpecSection title="Connectivity">
            <SpecItem label="USB 2.0 Ports" value={usb_a_2_0} />
            <SpecItem label="USB 3.1 Ports" value={usb_a_3_1} />
            <SpecItem label="USB Type-C" value={usb_type_c} />
            <SpecItem label="VGA" value={vga_connection} />
            <SpecItem label="HDMI" value={hdmi_connection} />
            <SpecItem label="DisplayPort" value={dp_connection} />
          </SpecSection>
        )}

        {hasNetworking && (
          <SpecSection title="Networking">
            <SpecItem label="Ethernet" value={ethernet ? `${ethernet} Mbps` : undefined} />
            <SpecItem label="Bluetooth" value={bluetooth} />
            <SpecItem label="Wireless" value={wireless} />
          </SpecSection>
        )}

        <SpecSection title="Physical Specifications">
          {hasPhysicalSpecs && (
            <>
              <SpecItem label="Weight" value={weight ? `${weight} kg` : undefined} />
              <SpecItem label="Width" value={width ? `${width} cm` : undefined} />
              <SpecItem label="Height" value={height ? `${height} cm` : undefined} />
              <SpecItem label="Depth" value={depth ? `${depth} cm` : undefined} />
            </>
          )}
          <SpecItem label="Case" value={case_name} />
          <SpecItem label="Case Type" value={case_type} />
          <SpecItem label="Color" value={color} />
        </SpecSection>

        <SpecSection title="Additional Information">
          <SpecItem label="Motherboard" value={motherboard} />
          {extra_hardware && <SpecItem label="Extra Hardware" value={extra_hardware} />}
          <SpecItem label="Operating System" value={installed_os} />
          <SpecItem label="Warranty" value={warranty ? `${warranty} months` : undefined} />
        </SpecSection>
      </div>
    </div>
  );
};