import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  IconButton, 
  Button,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as PlayArrowIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import { TikTokVideo } from '../types';
import { formatDistanceToNow } from 'date-fns';

const PlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, playlists, videos, updatePlaylist, deletePlaylist, removeVideoFromPlaylist } = useAppContext();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  
  const playlist = playlists.find(p => p.id === id);
  
  useEffect(() => {
    if (playlist) {
      setPlaylistName(playlist.name);
      setPlaylistDescription(playlist.description);
    }
  }, [playlist]);
  
  if (!playlist) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Playlist not found</Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/playlists')}
          sx={{ mt: 2 }}
        >
          Back to Playlists
        </Button>
      </Box>
    );
  }
  
  const playlistVideos = playlist.videos
    .map(videoId => videos.find(v => v.id === videoId))
    .filter(v => v !== undefined) as TikTokVideo[];
  
  const currentVideo = playlistVideos[currentVideoIndex];
  const nextVideoId = currentVideoIndex < playlistVideos.length - 1 
    ? playlistVideos[currentVideoIndex + 1].id 
    : undefined;
  
  const handleEditPlaylist = () => {
    updatePlaylist(playlist.id, {
      name: playlistName,
      description: playlistDescription
    });
    setIsEditDialogOpen(false);
  };
  
  const handleDeletePlaylist = () => {
    deletePlaylist(playlist.id);
    navigate('/playlists');
  };
  
  const handleRemoveVideo = (videoId: string) => {
    removeVideoFromPlaylist(playlist.id, videoId);
    if (currentVideoIndex >= playlistVideos.length - 1) {
      setCurrentVideoIndex(Math.max(0, playlistVideos.length - 2));
    }
  };
  
  const handleNextVideo = () => {
    if (currentVideoIndex < playlistVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/playlists')} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {playlist.name}
        </Typography>
        <IconButton onClick={() => setIsEditDialogOpen(true)} sx={{ mr: 1 }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setIsDeleteDialogOpen(true)} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {playlist.description}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Chip 
          icon={<AccessTimeIcon />} 
          label={`Updated ${formatDistanceToNow(new Date(playlist.updatedAt), { addSuffix: true })}`} 
          variant="outlined" 
          size="small"
        />
        <Chip 
          label={`${playlistVideos.length} videos`} 
          variant="outlined" 
          size="small" 
          sx={{ ml: 1 }}
        />
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {playlistVideos.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            This playlist is empty
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Add Videos
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {currentVideo && (
              <Paper 
                elevation={3} 
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  aspectRatio: '9/16',
                  maxHeight: '80vh',
                  display: 'flex',
                  justifyContent: 'center',
                  bgcolor: 'black'
                }}
              >
                <Box 
                  sx={{ 
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      maxWidth: '605px',
                      position: 'relative' 
                    }}
                  >
                    <iframe 
                      src={`https://www.tiktok.com/embed/v2/${currentVideo.url.split('/').pop()?.split('?')[0] || ''}?autoplay=1`}
                      width="100%" 
                      height="100%" 
                      frameBorder="0"
                      allow="autoplay; encrypted-media; microphone; speaker"
                      allowFullScreen
                      style={{ maxWidth: '605px' }}
                    />
                  </div>
                </Box>
              </Paper>
            )}
            
            {currentVideo && (
              <Paper sx={{ p: 2, mt: 2, borderRadius: 2 }}>
                <Typography variant="h6">{currentVideo.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentVideo.author}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    disabled={currentVideoIndex === 0}
                    onClick={() => setCurrentVideoIndex(prev => Math.max(0, prev - 1))}
                  >
                    Anterior
                  </Button>
                  <Button 
                    variant="contained" 
                    disabled={currentVideoIndex >= playlistVideos.length - 1}
                    onClick={handleNextVideo}
                    endIcon={<PlayArrowIcon />}
                  >
                    Próximo vídeo
                  </Button>
                </Box>
              </Paper>
            )}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="h6">Playlist Videos</Typography>
              </Box>
              <Divider />
              <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                {playlistVideos.map((video, index) => (
                  <React.Fragment key={video.id}>
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={index === currentVideoIndex}
                        onClick={() => setCurrentVideoIndex(index)}
                        sx={{
                          '&.Mui-selected': {
                            bgcolor: 'action.selected',
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar 
                            variant="rounded" 
                            src={video.thumbnail} 
                            sx={{ width: 60, height: 60, borderRadius: 1 }}
                          />
                        </ListItemAvatar>
                        <ListItemText 
                          primary={video.title}
                          secondary={video.author}
                          sx={{ ml: 1 }}
                        />
                        <IconButton 
                          edge="end" 
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveVideo(video.id);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </ListItemButton>
                    </ListItem>
                    {index < playlistVideos.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}
      
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Playlist Name"
            fullWidth
            variant="outlined"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditPlaylist} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Delete Playlist</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja excluir esta playlist? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeletePlaylist} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlaylistPage;