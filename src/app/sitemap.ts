import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jotto.co.jp";
  const paths = ["", "/company", "/service", "/recruit", "/news", "/contact", "/privacy", "/legal"];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
