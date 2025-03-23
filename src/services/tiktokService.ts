import axios from 'axios';
import { TikTokVideo } from '../types';

// This is a mock implementation since we don't have direct access to TikTok's API
// In a real application, you would need to use a proper API or backend service

export const extractVideoInfo = async (url: string): Promise<Partial<TikTokVideo>> => {
  try {
    // In a real implementation, this would call a backend API that extracts video info
    // For now, we'll simulate a response with mock data
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a random ID for the video
    const id = Math.random().toString(36).substring(2, 15);
    
    return {
      id,
      url,
      title: `TikTok Video ${id}`,
      author: `User_${Math.floor(Math.random() * 1000)}`,
      duration: Math.floor(Math.random() * 60) + 10, // Random duration between 10-70 seconds
      thumbnail: `https://picsum.photos/seed/${id}/400/600`, // Random placeholder image
      addedAt: new Date(),
    };
  } catch (error) {
    console.error('Error extracting video info:', error);
    throw new Error('Failed to extract video information');
  }
};

export const fetchTikTokEmbed = async (url: string): Promise<string> => {
  try {
    // In a real implementation, this would use TikTok's oEmbed API
    // For now, we'll return a mock embed code
    return `<blockquote class="tiktok-embed" cite="${url}" data-video-id="${url.split('/').pop()}" style="max-width: 605px;min-width: 325px;">
      <section><a target="_blank" href="${url}">Loading TikTok content...</a></section>
    </blockquote>
    <script async src="https://www.tiktok.com/embed.js"></script>`;
  } catch (error) {
    console.error('Error fetching TikTok embed:', error);
    throw new Error('Failed to fetch TikTok embed');
  }
};