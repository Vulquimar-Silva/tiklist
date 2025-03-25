import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from '@mui/material';
import { PlaylistAdd as PlaylistAddIcon } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

interface AddToPlaylistDialogProps {
  open: boolean;
  onClose: () => void;
  videoId: string;
}

const AddToPlaylistDialog: React.FC<AddToPlaylistDialogProps> = ({ open, onClose, videoId }) => {
  const { playlists, addVideoToPlaylist } = useAppContext();

  const handleAddToPlaylist = (playlistId: string) => {
    // Adiciona o vídeo à playlist
    addVideoToPlaylist(playlistId, videoId);
    
    // Fecha o modal imediatamente após adicionar
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>Add to Playlist</DialogTitle>
      <Divider />
      <DialogContent>
        {playlists.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
            Nenhuma playlist disponível. Crie uma playlist primeiro.
          </Typography>
        ) : (
          <List sx={{ pt: 0 }}>
            {playlists.map((playlist) => (
              <ListItem 
                onClick={() => handleAddToPlaylist(playlist.id)} 
                key={playlist.id}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemIcon>
                  <PlaylistAddIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={playlist.name} 
                  secondary={playlist.description || `${playlist.videos.length} videos`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CANCEL</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToPlaylistDialog;