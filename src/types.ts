export interface TikTokVideo {
  id: string;
  url: string;
  title: string;
  author: string;
  thumbnail: string;
  duration: number;
  addedAt: Date;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  videos: string[]; // Array de IDs de vídeos
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    darkMode: boolean;
    autoplay?: boolean;
    muteVideos?: boolean;
  };
}

export interface UserPreferences {
  darkMode: boolean;
  autoplay?: boolean;
  muteVideos?: boolean;
}