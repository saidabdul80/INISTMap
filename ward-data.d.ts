export interface WardProperties {
  state: string;
  lga: string;
  ward: string;
}

export interface WardFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: unknown[];
  };
  properties: WardProperties;
}

export interface WardFeatureCollection {
  type: 'FeatureCollection';
  features: WardFeature[];
}

declare const wardData: WardFeatureCollection;
export { wardData };
export default wardData;
