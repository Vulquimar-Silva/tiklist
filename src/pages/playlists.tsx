import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../context/AppContext';
import { LayoutContext } from '../components/Layout';
import { Playlist } from '../types';

interface LayoutContextType {
  closeAllModals?: () => void;
  isModalOpen?: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
}

const PlaylistsPage: React.FC = () => {
  const { playlists, addPlaylist } = useAppContext();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

  useEffect(() => {
    const handleCloseModals = () => {
      setOpenCreateModal(false);
    };
    
    window.addEventListener('close-all-modals', handleCloseModals);
    
    return () => {
      window.removeEventListener('close-all-modals', handleCloseModals);
    };
  }, []);

  let layoutContext: LayoutContextType | null = null;
  try {
    layoutContext = useContext(LayoutContext);
  } catch (error) {
    console.log('LayoutContext não disponível:', error);
  }

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setNewPlaylistName('');
    setNewPlaylistDescription('');
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;

    const newPlaylist: Playlist = {
      id: uuidv4(),
      name: newPlaylistName.trim(),
      description: newPlaylistDescription.trim(),
      videos: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    addPlaylist(newPlaylist);
    
    handleCloseCreateModal();
    
    if (layoutContext && layoutContext.setIsModalOpen) {
      layoutContext.setIsModalOpen(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Playlists
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Create New Playlist
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenCreateModal}
          sx={{ mt: 1 }}
        >
          CREATE PLAYLIST
        </Button>
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Suas listas de reprodução
      </Typography>
      
      {playlists.length === 0 ? (
        <Typography color="text.secondary">
          No playlists yet. Create your first playlist!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {playlists.map((playlist) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://source.unsplash.com/random/300x200?sig=${playlist.id}`}
                    alt={playlist.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {playlist.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {playlist.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {playlist.videos.length} videos
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Modal para criar nova playlist */}
      <Dialog open={openCreateModal} onClose={handleCloseCreateModal}>
        <DialogTitle>Create New Playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Playlist Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description (optional)"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={newPlaylistDescription}
            onChange={(e) => setNewPlaylistDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateModal}>Cancel</Button>
          <Button 
            onClick={handleCreatePlaylist} 
            variant="contained"
            disabled={!newPlaylistName.trim()}
          >
            CREATE PLAYLIST
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlaylistsPage;