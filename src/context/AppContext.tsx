import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TikTokVideo, Playlist, User, UserPreferences } from '../types';

interface AppContextType {
  videos: TikTokVideo[];
  playlists: Playlist[];
  user: User;
  addVideo: (video: TikTokVideo) => void;
  updateVideo: (id: string, video: Partial<TikTokVideo>) => void;
  deleteVideo: (id: string) => void;
  addPlaylist: (playlist: Playlist) => void;
  updatePlaylist: (id: string, playlist: Partial<Playlist>) => void;
  deletePlaylist: (id: string) => void;
  addVideoToPlaylist: (playlistId: string, videoId: string) => void;
  removeVideoFromPlaylist: (playlistId: string, videoId: string) => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<TikTokVideo[]>(() => {
    const savedVideos = localStorage.getItem('tiktok-list-videos');
    return savedVideos ? JSON.parse(savedVideos) : [];
  });

  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const savedPlaylists = localStorage.getItem('tiktok-list-playlists');
    return savedPlaylists ? JSON.parse(savedPlaylists) : [];
  });

  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('tiktok-list-user');
    return savedUser
      ? JSON.parse(savedUser)
      : {
          id: '1',
          name: 'User',
          email: 'user@example.com',
          preferences: {
            darkMode: false,
            autoplay: true,
            muteVideos: false
          },
        };
  });

  useEffect(() => {
    localStorage.setItem('tiktok-list-videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('tiktok-list-playlists', JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem('tiktok-list-user', JSON.stringify(user));
  }, [user]);

  const addVideo = (video: TikTokVideo) => {
    setVideos(prevVideos => [...prevVideos, video]);
  };

  const updateVideo = (id: string, updates: Partial<Omit<TikTokVideo, 'id'>>) => {
    setVideos(prevVideos => 
      prevVideos.map(video => 
        video.id === id ? { ...video, ...updates } : video
      )
    );
    
    const updatedVideos = videos.map(video => 
      video.id === id ? { ...video, ...updates } : video
    );
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
  };

  const deleteVideo = (id: string) => {
    setVideos(prevVideos => prevVideos.filter(video => video.id !== id));
    
    setPlaylists(prevPlaylists =>
      prevPlaylists.map(playlist => ({
        ...playlist,
        videos: playlist.videos.filter((videoId: string) => videoId !== id),
      }))
    );
  };

  const addPlaylist = (playlist: Playlist) => {
    setPlaylists(prevPlaylists => [...prevPlaylists, playlist]);
  };

  const updatePlaylist = (id: string, playlistUpdate: Partial<Playlist>) => {
    setPlaylists(prevPlaylists =>
      prevPlaylists.map(playlist =>
        playlist.id === id
          ? { ...playlist, ...playlistUpdate, updatedAt: new Date() }
          : playlist
      )
    );
  };

  const deletePlaylist = (id: string) => {
    setPlaylists(prevPlaylists => prevPlaylists.filter(playlist => playlist.id !== id));
  };

  const addVideoToPlaylist = (playlistId: string, videoId: string) => {
    setPlaylists(prevPlaylists =>
      prevPlaylists.map(playlist =>
        playlist.id === playlistId && !playlist.videos.includes(videoId)
          ? {
              ...playlist,
              videos: [...playlist.videos, videoId],
              updatedAt: new Date(),
            }
          : playlist
      )
    );
  };

  const removeVideoFromPlaylist = (playlistId: string, videoId: string) => {
    setPlaylists(prevPlaylists =>
      prevPlaylists.map(playlist =>
        playlist.id === playlistId
          ? {
              ...playlist,
              videos: playlist.videos.filter((id: string) => id !== videoId),
              updatedAt: new Date(),
            }
          : playlist
      )
    );
  };

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...preferences
      }
    }));
  };

  return (
    <AppContext.Provider value={{
      videos,
      playlists,
      user,
      addVideo,
      updateVideo,
      deleteVideo,
      addPlaylist,
      updatePlaylist,
      deletePlaylist,
      addVideoToPlaylist,
      removeVideoFromPlaylist,
      updateUserPreferences,
    }}>
      {children}
    </AppContext.Provider>
  );
};