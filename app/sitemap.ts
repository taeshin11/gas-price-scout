import type { MetadataRoute } from "next";
import { getAllStates, getAllCities, getAllGrades } from "@/lib/fallback";

const BASE_URL = "https://gas-price-scout.vercel.app";
const LOCALES = ["en", "es", "fr", "de", "ko", "ja", "zh", "pt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const states = getAllStates();
  const cities = getAllCities();
  const grades = getAllGrades();

  const entries: MetadataRoute.Sitemap = [];

  // Homepage per locale
  LOCALES.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  });

  // States index per locale
  LOCALES.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}/states`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // Each state per locale
  LOCALES.forEach((locale) => {
    states.forEach((state) => {
      entries.push({
        url: `${BASE_URL}/${locale}/states/${state.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  // Cities index per locale
  LOCALES.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}/cities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // Each city per locale
  LOCALES.forEach((locale) => {
    cities.forEach((city) => {
      entries.push({
        url: `${BASE_URL}/${locale}/cities/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  });

  // Grades index per locale
  LOCALES.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}/grades`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // Each grade per locale
  LOCALES.forEach((locale) => {
    grades.forEach((grade) => {
      entries.push({
        url: `${BASE_URL}/${locale}/grades/${grade.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  });

  // History per locale
  LOCALES.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}/history`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  // Content pages per locale
  const contentPages = ["about", "how-to-use", "privacy", "terms"];
  contentPages.forEach((slug) => {
    LOCALES.forEach((locale) => {
      entries.push({
        url: `${BASE_URL}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  return entries;
}
