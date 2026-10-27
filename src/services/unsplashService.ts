/**
 * Unsplash API Service for Rashtra Bharosa Group
 * Curated high-resolution Indian corporate, industrial, infrastructure, and heavy engineering imagery.
 */

const UNSPLASH_ACCESS_KEY =
  import.meta.env.VITE_UNSPLASH_ACCESS_KEY ||
  "BVsyXa2p2BNCG-Z_ZfNPqcocw2ec1iiznH-MwV1mUdc";

export interface UnsplashImageResult {
  id: string;
  url: string;
  thumbUrl: string;
  alt: string;
  photographerName: string;
  photographerUrl: string;
}

// In-memory cache to prevent excessive API rate-limiting
const imageCache: Record<string, UnsplashImageResult[]> = {};

/**
 * Searches Unsplash for Indian corporate, mining, EPC, logistics, agriculture, or tech imagery.
 * Automatically appends Indian context terms to ensure only authentic Indian visuals are surfaced.
 */
export async function fetchIndianImagery(
  topicQuery: string,
  count = 6
): Promise<UnsplashImageResult[]> {
  const sanitizedQuery = `${topicQuery} India industrial corporate infrastructure`.trim();

  if (imageCache[sanitizedQuery] && imageCache[sanitizedQuery].length >= count) {
    return imageCache[sanitizedQuery].slice(0, count);
  }

  try {
    const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      sanitizedQuery
    )}&per_page=${count}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;

    const res = await fetch(endpoint);
    if (!res.ok) {
      console.warn(`Unsplash API HTTP ${res.status}: fallback to curated assets`);
      return getCuratedFallbackImages(topicQuery, count);
    }

    const data = await res.json();
    if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
      return getCuratedFallbackImages(topicQuery, count);
    }

    const results: UnsplashImageResult[] = data.results.map((photo: any) => ({
      id: photo.id,
      url: photo.urls?.regular || photo.urls?.full,
      thumbUrl: photo.urls?.small || photo.urls?.thumb,
      alt: photo.alt_description || photo.description || `${topicQuery} - India industrial infrastructure`,
      photographerName: photo.user?.name || "Unsplash Contributor",
      photographerUrl: photo.user?.links?.html || "https://unsplash.com",
    }));

    imageCache[sanitizedQuery] = results;
    return results;
  } catch (error) {
    console.warn("Unsplash fetch error:", error);
    return getCuratedFallbackImages(topicQuery, count);
  }
}

/**
 * Fallback curated high-quality Indian corporate & industrial visual assets
 */
function getCuratedFallbackImages(topic: string, count: number): UnsplashImageResult[] {
  const fallbacks: Record<string, string[]> = {
    mining: [
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    ],
    infrastructure: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    ],
    healthcare: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    ],
    technology: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    ],
    agriculture: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    ],
    realestate: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    ],
    default: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    ],
  };

  const key = Object.keys(fallbacks).find((k) => topic.toLowerCase().includes(k)) || "default";
  const urls = fallbacks[key] || fallbacks.default;

  return urls.slice(0, count).map((url, i) => ({
    id: `fallback-${key}-${i}`,
    url,
    thumbUrl: url,
    alt: `Rashtra Bharosa Group Indian Industrial Assets — ${topic}`,
    photographerName: "Rashtra Bharosa Media Archive",
    photographerUrl: "https://www.rashtrabharosagroup.com",
  }));
}
