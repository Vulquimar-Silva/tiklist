import React, { useState } from 'react';
import { Box, Typography, Divider, Button, Dialog, DialogContent, Paper } from '@mui/material';
import PlaylistForm from '../components/PlaylistForm';
import PlaylistGrid from '../components/PlaylistGrid';
import { useAppContext } from '../context/AppContext';

const PlaylistsPage: React.FC = () => {
  const { playlists } = useAppContext();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Sort playlists by date updated (newest first)
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
        
        <Box       
sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Create New Playlist
          </Typography>
          <Button 
            variant="contained" 
            fullWidth
            onClick={() => setIsCreateDialogOpen(true)}
            sx={{ py: 1.5 }}
          >
            CREATE PLAYLIST
          </Button>
        </Box>
      </Paper>
      
      <Dialog open={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)}>
        <DialogContent>
          <PlaylistForm />
        </DialogContent>
      </Dialog>
      
      <PlaylistGrid 
        playlists={sortedPlaylists} 
        title="Your Playlists" 
        emptyMessage="No playlists created yet. Create your first playlist above!" 
      />
    </Box>
  );
};

export default PlaylistsPage;