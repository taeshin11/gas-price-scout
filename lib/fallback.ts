import statesData from "../data/states-fallback.json";
import citiesData from "../data/cities-fallback.json";
import gradesData from "../data/grades.json";
import type { StatePrice, CityPrice, GradeInfo, TrendDataPoint } from "../types/gas";

export function getAllStates(): StatePrice[] {
  return statesData as StatePrice[];
}

export function getStateBySlug(slug: string): StatePrice | undefined {
  return (statesData as StatePrice[]).find((s) => s.slug === slug);
}

export function getAllCities(): CityPrice[] {
  return citiesData as CityPrice[];
}

export function getCityBySlug(slug: string): CityPrice | undefined {
  return (citiesData as CityPrice[]).find((c) => c.slug === slug);
}

export function getCitiesByState(stateSlug: string): CityPrice[] {
  return (citiesData as CityPrice[]).filter((c) => c.stateSlug === stateSlug);
}

export function getAllGrades(): GradeInfo[] {
  return gradesData as GradeInfo[];
}

export function getGradeBySlug(slug: string): GradeInfo | undefined {
  return (gradesData as GradeInfo[]).find((g) => g.slug === slug);
}

export function getNationalAverage(): number {
  const states = getAllStates();
  return states.reduce((sum, s) => sum + s.regular, 0) / states.length;
}

export function getCheapestStates(count = 5): StatePrice[] {
  return getAllStates()
    .sort((a, b) => a.regular - b.regular)
    .slice(0, count);
}

export function getMostExpensiveStates(count = 5): StatePrice[] {
  return getAllStates()
    .sort((a, b) => b.regular - a.regular)
    .slice(0, count);
}

export function getStatesRanked(): StatePrice[] {
  return getAllStates().sort((a, b) => a.regular - b.regular);
}

// Generate 12-week historical trend data (simulated)
export function getNationalTrendData(): TrendDataPoint[] {
  const baseRegular = 3.40;
  const basePremium = 4.04;
  const baseDiesel = 3.67;
  const weeks: TrendDataPoint[] = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(2026, 3, 13); // April 13, 2026
    date.setDate(date.getDate() - i * 7);
    const variance = (Math.sin(i * 0.5) * 0.15) + (Math.random() * 0.08 - 0.04);
    weeks.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      regular: parseFloat((baseRegular + variance).toFixed(3)),
      premium: parseFloat((basePremium + variance * 1.1).toFixed(3)),
      diesel: parseFloat((baseDiesel + variance * 0.9).toFixed(3)),
    });
  }
  return weeks;
}

export function getStateTrendData(stateSlug: string): TrendDataPoint[] {
  const state = getStateBySlug(stateSlug);
  if (!state) return getNationalTrendData();

  const base = state.regular;
  const weeks: TrendDataPoint[] = [];
  for (let i = 11; i >= 0; i--) {
    const date = new Date(2026, 3, 13);
    date.setDate(date.getDate() - i * 7);
    const variance = (Math.sin(i * 0.5) * 0.12) + (Math.random() * 0.06 - 0.03);
    weeks.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      regular: parseFloat((base + variance).toFixed(3)),
      premium: parseFloat((base + 0.64 + variance * 1.1).toFixed(3)),
      diesel: parseFloat((base + 0.27 + variance * 0.9).toFixed(3)),
    });
  }
  return weeks;
}
