interface Image {
  url: string;
}

export interface MonitorPreview {
  id: string;
  name: string;
  maker: string;
  price: number;
  diagonal: number;
  resolution: string;
  panel_type: string;
  refresh_rate: number;
  image: string;
  is_available: boolean;
}

export interface Monitor extends MonitorPreview {
  description?: string;
  images_url?: Image[];
  brightness?: number;
  response_time?: number;
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
  is_curved: boolean;
  vesa_mounting?: string;
  has_speaker: boolean;
  pivot: boolean;
  is_adjustable_height: boolean;
  has_touchscreen: boolean;
  accessories?: string;
  energy_class?: string;
  width?: number;
  height?: number;
  depth?: number;
  weight?: number;
  warranty?: number;
}

// MonitorDetail type includes all fields from Monitor
export type MonitorDetail = Monitor;