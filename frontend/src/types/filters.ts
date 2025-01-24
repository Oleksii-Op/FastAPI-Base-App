export interface RangeValue {
  min: number;
  max: number;
}

export interface UniqueAttributes {
  gpu_models: string[];
  price_range: RangeValue;
  diagonal_range: RangeValue;
  screen_frequency_range: RangeValue;
  makers: string[];
  resolutions: string[];
  cpu_makers: string[];
  cpu_models: string[];
  cpu_cores: number[];
  gpu_makers: string[];
  gpu_memories: number[];
  ram_sizes: number[];
  ram_types: string[];
  storage_sizes: number[];
  storage_types: string[];
  hdmi_connections: number[];
  dp_connections: number[];
  installed_os: string[];
  screen_types: string[];
}

export interface LaptopFilterParams {
  price_min?: number;
  price_max?: number;
  maker?: string[];
  is_for_gaming?: boolean;
  is_for_home_studying?: boolean;
  is_for_office?: boolean;
  diagonal_min?: number;
  diagonal_max?: number;
  resolution?: string[];
  screen_frequency_min?: number;
  screen_frequency_max?: number;
  cpu_maker?: string[];
  cpu_model?: string[];
  cpu_cores?: number[];
  gpu_maker?: string[];
  gpu_model?: string[];
  gpu_memory?: number[];
  ram_size?: number[];
  ram_type?: string[];
  storage_size?: number[];
  storage_type?: string[];
  hdmi_connection?: number[];
  dp_connection?: number[];
  installed_os?: string[];
  screen_type?: string[];
}