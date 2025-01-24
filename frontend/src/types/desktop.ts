interface Image {
  url: string;
}

export interface DesktopPreview {
  id: string;
  name: string;
  price: number;
  diagonal: number;
  cpu_model: string;
  ram_size: number;
  storage_size: number;
  gpu_maker: string;
  gpu_model: string;
  image: string;
  is_available: boolean;
}

export interface Desktop extends DesktopPreview {
  description?: string;
  maker?: string;
  is_for_gaming: boolean;
  is_for_home_studying: boolean;
  is_for_office: boolean;
  has_screen: boolean;
  is_mini: boolean;
  ram_type: string;
  ram_frequency: number;
  cpu_maker: string;
  cpu_class: string;
  cpu_frequency: number;
  cpu_max_frequency: number;
  cpu_cores: number;
  cpu_threads: number;
  resolution?: string;
  gpu_memory: number;
  gpu_memory_type: string;
  power_supply_name: string;
  power_supply: number;
  storage_type: string;
  storage_connection: string;
  extra_hardware?: string;
  usb_a_2_0: number;
  usb_a_3_1: number;
  usb_type_c: number;
  vga_connection: number;
  hdmi_connection: number;
  dp_connection: number;
  case_name: string;
  case_type: string;
  motherboard: string;
  ethernet: number;
  bluetooth?: string;
  wireless?: string;
  warranty: number;
  installed_os?: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  color: string;
  images_url?: Image[];
}

export type DesktopDetail = Desktop;