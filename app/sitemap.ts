import type { MetadataRoute } from 'next';

// Marketing site custom domain (see CNAME). Single-route static-export site.
const baseUrl = 'https://lunar.fan';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
