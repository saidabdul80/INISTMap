import type { WardFeatureCollection } from './ward-data';

export type MapLevel = 'lgas' | 'wards';
export type ScaleType = 'linear' | 'equal' | 'quantile';
export type PopoverTrigger = 'hover' | 'click' | 'contextmenu' | 'both';

export interface MapFeature {
  id: string;
  name: string;
  level?: MapLevel;
  lga?: string | null;
  value: number | string | null;
  label: string;
  description: string;
  data: MapDataItem;
}

export interface MapDataItem {
  value?: number | string | null;
  label?: string;
  description?: string;
  color?: string;
  url?: string;
  href?: string;
  redirect?: string | boolean;
  redirectTo?: string;
  target?: string;
  linkLabel?: string;
  navigate?: boolean;
  [key: string]: unknown;
}

export interface MapPin {
  id?: string;
  x: number;
  y: number;
  label?: string;
  description?: string;
  color?: string;
  onClick?: (pin: MapPin) => void;
}

export interface MapViewport {
  zoom: number;
  viewBox: { x: number; y: number; width: number; height: number };
}

export interface INISTMapOptions {
  mapUrl?: string | null;
  title?: string;
  data?: Record<string, MapDataItem>;
  featureMap?: Record<string, string> | null;
  valueLabel?: string;
  colors?: string[];
  scaleType?: ScaleType;
  classes?: number;
  showLegend?: boolean;
  showSearch?: boolean;
  showStats?: boolean;
  showLabels?: boolean;
  labelMode?: 'name' | 'value' | 'both';
  showControls?: boolean;
  wheelZoom?: boolean;
  wheelSensitivity?: number;
  minZoom?: number;
  maxZoom?: number;
  panOverscroll?: number;
  extrusionDepth?: number;
  extrusionColor?: string;
  zoomOnSelect?: boolean;
  popover?: boolean;
  popoverTrigger?: PopoverTrigger;
  wardDrilldown?: boolean;
  wardDataUrl?: string | null;
  wardGeoJSON?: WardFeatureCollection | null;
  wardData?: Record<string, Record<string, MapDataItem>>;
  redirectOnFeatureClick?: boolean;
  redirectTarget?: '_self' | '_blank';
  theme?: 'light' | 'dark';
  compact?: boolean;
  variant?: 'card' | 'plain';
  pins?: MapPin[];
  onFeatureClick?: (feature: MapFeature) => void;
  onFeatureHover?: (feature: MapFeature | null) => void;
  onViewportChange?: (viewport: MapViewport) => void;
  onReady?: (map: INISTMap) => void;
  onError?: (error: Error) => void;
}

declare class INISTMap {
  static readonly features: Readonly<Record<string, string>>;
  readonly ready: Promise<INISTMap | null>;

  constructor(target: string | Element, options?: INISTMapOptions);
  setData(data: Record<string, MapDataItem>): this;
  select(nameOrId: string): this;
  clearSelection(): this;
  zoomBy(factor: number, clientX?: number, clientY?: number, animate?: boolean): this;
  zoomTo(nameOrId: string, padding?: number, animate?: boolean): this;
  resetView(animate?: boolean): this;
  toggleFullscreen(): Promise<this>;
  export(format?: 'svg' | 'png'): Promise<Blob | null>;
  addPin(pin: MapPin): SVGGElement | null;
  removePin(id: string): this;
  clearPins(): this;
  openWardMap(lgaName: string): Promise<this>;
  backToLGAs(): this;
  destroy(): void;
}

export { INISTMap };
export default INISTMap;
