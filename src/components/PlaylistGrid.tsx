import React, { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import PlaylistCard from './PlaylistCard';
import { Playlist } from '../types';
import { useNavigate } from 'react-router-dom';

interface PlaylistGridProps {
  playlists: Playlist[];
  title?: string;
  emptyMessage?: string;
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({ 
  playlists, 
  title = 'Playlists', 
  emptyMessage = 'No playlists found' 
}) => {
  const navigate = useNavigate();

  const handleSelectPlaylist = (playlist: Playlist) => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {title && (
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
      )}

      {playlists.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
          {emptyMessage}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {playlists.map((playlist) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.id}>
              <PlaylistCard 
                playlist={playlist} 
                onSelect={handleSelectPlaylist} 
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PlaylistGrid;