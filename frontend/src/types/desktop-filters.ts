export interface DesktopFilterParams {
  price_min?: number;
  price_max?: number;
  maker?: string[];
  is_for_gaming?: boolean;
  is_for_home_studying?: boolean;
  is_for_office?: boolean;
  has_screen?: boolean;
  is_mini?: boolean;
  ram_type?: string[];
  ram_frequency?: number[];
  ram_size?: number[];
  gpu_maker?: string[];
  gpu_model?: string[];
  gpu_memory?: number[];
  cpu_maker?: string[];
  cpu_class?: string[];
  cpu_cores?: number[];
  storage_size?: number[];
  storage_type?: string[];
}

export interface DesktopUniqueAttributes {
  gpu_models: string[];
  price_range: {
    min: number;
    max: number;
  };
  makers: string[];
  cpu_makers: string[];
  cpu_models: string[];
  cpu_cores: number[];
  gpu_makers: string[];
  gpu_memories: (number | null)[];
  ram_sizes: number[];
  ram_types: string[];
  ram_frequency: number[];
  storage_sizes: number[];
  storage_types: string[];
}