import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Divider, 
  Paper, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import VideoGrid from '../components/VideoGrid';

const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playlists, videos, deletePlaylist, removeVideoFromPlaylist } = useAppContext();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [videoToRemove, setVideoToRemove] = useState<string | null>(null);
  
  const playlist = playlists.find(p => p.id === id);
  
  if (!playlist) {
    navigate('/playlists');
    return null;
  }
  
  const playlistVideos = videos.filter(video => playlist.videos.includes(video.id));
  
  const handleGoBack = () => {
    navigate('/playlists');
  };
  
  const handleDeletePlaylist = () => {
    deletePlaylist(playlist.id);
    navigate('/playlists');
  };
  
  const handleConfirmRemove = () => {
    if (videoToRemove) {
      removeVideoFromPlaylist(playlist.id, videoToRemove);
      setVideoToRemove(null);
    }
    setDeleteDialogOpen(false);
  };
  
  const handleCancelRemove = () => {
    setVideoToRemove(null);
    setDeleteDialogOpen(false);
  };

  return (
    <Box  sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleGoBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {playlist.name}
        </Typography>
        <Button 
          variant="outlined" 
          color="error" 
          startIcon={<DeleteIcon />}
          onClick={() => setDeleteDialogOpen(true)}
        >
          Delete Playlist
        </Button>
      </Box>
      
      {playlist.description && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="body1">{playlist.description}</Typography>
        </Paper>
      )}
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {playlist.videos.length} {playlist.videos.length === 1 ? 'video' : 'videos'} • 
        Created: {new Date(playlist.createdAt).toLocaleDateString()} • 
        Updated: {new Date(playlist.updatedAt).toLocaleDateString()}
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <VideoGrid 
        videos={playlistVideos} 
        title="Videos in this Playlist" 
        emptyMessage="This playlist is empty. Add videos to get started!" 
      />
      
      {/* Delete Playlist Confirmation Dialog */}
      <Dialog open={deleteDialogOpen && !videoToRemove} onClose={handleCancelRemove}>
        <DialogTitle>Delete Playlist</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja excluir a lista de reprodução "{playlist.name}"? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemove}>Cancel</Button>
          <Button onClick={handleDeletePlaylist} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Remove Video Confirmation Dialog */}
      <Dialog open={deleteDialogOpen && !!videoToRemove} onClose={handleCancelRemove}>
        <DialogTitle>Remove Video</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja remover este vídeo da playlist? O vídeo ainda estará disponível na sua biblioteca.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemove}>Cancel</Button>
          <Button onClick={handleConfirmRemove} color="error" variant="contained">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlaylistDetailPage;