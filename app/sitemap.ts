import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { products } from "@/lib/products";

const BASE = "https://ethoralabs.co";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({ url: `${BASE}/services/${s.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${BASE}/products/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...products.map((p) => ({ url: `${BASE}/products/${p.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${BASE}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];
}
