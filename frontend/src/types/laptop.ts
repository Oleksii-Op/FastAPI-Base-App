interface Image {
  url: string;
}

export interface LaptopPreview {
  id: string;
  name: string;
  price: number;
  diagonal: number;
  resolution: string;
  screen_type: string;
  cpu_model: string | null;
  image: string;
  is_available: boolean;
}

export interface LaptopDetail extends LaptopPreview {
  maker: string;
  screen_frequency?: number;
  // CPU
  cpu_maker: string;
  cpu_class?: string;
  cpu_frequency?: number;
  cpu_max_frequency?: number;
  cpu_cores?: number;
  cpu_threads?: number;
  // GPU
  gpu_maker?: string;
  gpu_model?: string;
  gpu_memory?: number;
  gpu_memory_type?: string;
  // RAM
  ram_size?: number;
  ram_type?: string;
  ram_frequency?: number;
  // Storage
  storage_size?: number;
  storage_type?: string;
  // Hardware
  extra_hardware?: string;
  usb_a_2_0?: number;
  usb_a_3_1?: number;
  usb_type_c?: number;
  vga_connection?: number;
  hdmi_connection?: number;
  dp_connection?: number;
  // Connectivity
  ethernet?: number;
  bluetooth?: string;
  wireless?: string;
  // Usage
  is_for_gaming: boolean;
  is_for_home_studying: boolean;
  is_for_office: boolean;
  // Additional Info
  warranty?: number;
  installed_os?: string;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
  description?: string;
  images_url?: Image[];
}

export interface LaptopCreate extends LaptopDetail {
  is_available: boolean;
}

export interface LaptopUpdate extends Partial<LaptopCreate> {}