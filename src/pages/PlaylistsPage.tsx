import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PlaylistForm from '../components/PlaylistForm';
import PlaylistGrid from '../components/PlaylistGrid';
import { useAppContext } from '../context/AppContext';

const PlaylistsPage: React.FC = () => {
  const { playlists } = useAppContext();
  
  const sortedPlaylists = [...playlists].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <Box sx={{ p: 3 }}>
      <Paper 
        sx={{ 
          p: 3, 
          mb: 4, 
          bgcolor: 'rgba(0, 0, 0, 0.05)', 
          borderRadius: 2 
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Playlists
        </Typography>
        
        {/* Incluir o PlaylistForm diretamente aqui */}
        <PlaylistForm />
      </Paper>
      
      <PlaylistGrid 
        playlists={sortedPlaylists} 
        title="Suas listas de reprodução" 
        emptyMessage="Nenhuma playlist criada ainda. Crie sua primeira playlist acima!" 
      />
    </Box>
  );
};

export default PlaylistsPage;