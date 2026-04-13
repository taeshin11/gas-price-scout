export interface StatePrice {
  slug: string;
  name: string;
  abbr: string;
  regular: number;
  midgrade: number;
  premium: number;
  diesel: number;
  weekChange: number;
  rank: number;
  stations: number;
}

export interface CityPrice {
  slug: string;
  name: string;
  state: string;
  stateSlug: string;
  abbr: string;
  regular: number;
  midgrade: number;
  premium: number;
  diesel: number;
  weekChange: number;
}

export interface GradeInfo {
  slug: string;
  name: string;
  octane: number | null;
  nationalAvg: number;
  weekChange: number;
  description: string;
  vehicles: string;
  color: string;
}

export interface TrendDataPoint {
  date: string;
  regular: number;
  premium: number;
  diesel: number;
}

export type GradeKey = "regular" | "midgrade" | "premium" | "diesel" | "e85";
