/**
 * Extracts the TikTok video ID from various TikTok URL formats
 */
export const extractTikTokId = (url: string): string | null => {
  // Handle different TikTok URL formats
  const patterns = [
    /tiktok\.com\/@[\w.-]+\/video\/(\d+)/i,
    /tiktok\.com\/t\/(\w+)/i,
    /vm\.tiktok\.com\/(\w+)/i,
    /(\d{19})/i // Direct ID format
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

/**
 * Generates a reliable embed URL for TikTok videos
 */
export const getTikTokEmbedUrl = (url: string): string => {
  const videoId = extractTikTokId(url);
  if (!videoId) {
    return '';
  }
  
  // Use the most reliable embed format
  return `https://www.tiktok.com/embed/v2/${videoId}`;
};

/**
 * Generates a direct link to the TikTok video
 */
export const getTikTokDirectUrl = (url: string): string => {
  const videoId = extractTikTokId(url);
  if (!videoId) {
    return url; // Return original if parsing fails
  }
  
  // Use canonical URL format
  return `https://www.tiktok.com/video/${videoId}`;
};