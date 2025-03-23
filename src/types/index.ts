export interface TikTokVideo {
  id: string;
  url: string;
  title: string;
  author: string;
  duration: number;
  thumbnail: string;
  customThumbnail?: string;
  addedAt: Date;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  videos: string[]; // Array of video IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    darkMode: boolean;
    autoplay: boolean;
  };
}