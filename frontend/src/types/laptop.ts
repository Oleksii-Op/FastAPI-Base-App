export interface LaptopPreview {
  id: string;
  name: string;
  price: number;
  diagonal: string;
  resolution: string;
  screen_type: string;
  cpu_model: string;
  image: string;
  is_available: boolean;
}

export interface LaptopDetail extends LaptopPreview {
  maker?: string;
  screen_frequency?: string;
  cpu_class: string;
  cpu_frequency?: string;
  cpu_cores?: number;
  cpu_threads?: number;
  gpu_model?: string;
  gpu_memory?: string;
  gpu_memory_type?: string;
  ram_size: string;
  ram_type?: string;
  ram_frequency?: string;
  storage_size: string;
  storage_type?: string;
  hardware_type?: string;
  warranty?: string;
  installed_os?: string;
  weight?: number;
  color?: string;
  description?: string;
  extra_image?: string;
}

export interface LaptopCreate extends LaptopDetail {
  is_available: boolean;
}

export interface LaptopUpdate extends Partial<LaptopCreate> {}