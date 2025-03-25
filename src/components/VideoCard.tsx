import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CardActionArea,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlaylistAdd as PlaylistAddIcon,
  PlayArrow as PlayArrowIcon,
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';
import { TikTokVideo } from '../types';
import { useAppContext } from '../context/AppContext';


interface VideoCardProps {
  video: TikTokVideo;
  onPlay: (video: TikTokVideo) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
  const { deleteVideo, updateVideo, playlists, addVideoToPlaylist } = useAppContext();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const [editTitle, setEditTitle] = useState(video.title);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleEditClick = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };
  
  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditTitle(video.title);
  };
  
  const handleEditSave = () => {
    updateVideo(video.id, { title: editTitle });
    setEditDialogOpen(false);
  };
  
  const handlePlaylistClick = () => {
    setPlaylistDialogOpen(true);
    handleMenuClose();
  };
  
  const handlePlaylistClose = () => {
    setPlaylistDialogOpen(false);
  };
  
  const handleAddToPlaylist = (playlistId: string) => {
    addVideoToPlaylist(playlistId, video.id);
    setPlaylistDialogOpen(false);
  };
  
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };
  
  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };
  
  const handleDeleteConfirm = () => {
    deleteVideo(video.id);
    setDeleteDialogOpen(false);
  };
  
  // Removendo formatDuration que não é usado

  return (
    <>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'transform 0.2s, box-shadow 0.2s',
          border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
          backgroundColor: 'background.paper', // Usa a cor de fundo do tema atual
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => theme.palette.mode === 'dark' 
              ? '0 12px 20px rgba(0,0,0,0.5)' 
              : '0 12px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <CardActionArea 
          onClick={() => onPlay(video)}
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
        >
          <Box 
            sx={{ 
              position: 'relative',
              paddingTop: '177.77%',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              backgroundImage: `url(${video.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                opacity: 0,
                transition: 'opacity 0.2s',
                '&:hover': {
                  opacity: 1
                }
              }}
            >
              <IconButton 
                sx={{ 
                  backgroundColor: (theme) => 
                    theme.palette.mode === 'dark' 
                      ? 'rgba(66, 66, 66, 0.9)' 
                      : 'rgba(255, 255, 255, 0.9)',
                  color: (theme) => 
                    theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : 'rgba(0, 0, 0, 0.9)',
                  '&:hover': {
                    backgroundColor: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? 'rgba(80, 80, 80, 1)' 
                        : 'rgba(255, 255, 255, 1)',
                  }
                }}
              >
                <PlayArrowIcon />
              </IconButton>
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography 
              gutterBottom 
              variant="subtitle1" 
              component="div" 
              noWrap
              sx={{ fontWeight: 600, lineHeight: 1.3 }}
            >
              {video.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                mt: 1
              }}
            >
              <PersonIcon fontSize="small" />
              {video.author}
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                mt: 1
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: 14 }} />
              {new Date(video.addedAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleMenuClick} aria-label="more options">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Card>

      {/* Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'video-options-button',
        }}
      >
        <MenuItem onClick={handleEditClick}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handlePlaylistClick}>
          <PlaylistAddIcon fontSize="small" sx={{ mr: 1 }} />
          Add Playlist
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleEditClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: 'background.paper' // Usa a cor de fundo do tema atual
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
        }}>
          Edit Video
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add to Playlist Dialog */}
      <Dialog 
        open={playlistDialogOpen} 
        onClose={handlePlaylistClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
          Add to Playlist
        </DialogTitle>
        <DialogContent>
          {playlists.length === 0 ? (
            <Typography>Nenhuma playlist disponível. Crie uma playlist primeiro..</Typography>
          ) : (
            playlists.map((playlist) => (
              <MenuItem 
                key={playlist.id} 
                onClick={() => handleAddToPlaylist(playlist.id)}
                sx={{ width: '100%', justifyContent: 'flex-start', display: 'flex', alignItems: 'center' }}
              >
                <PlaylistAddIcon color="primary" sx={{ mr: 1 }} />
                {playlist.name}
              </MenuItem>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePlaylistClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleDeleteClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
          Delete Video
        </DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja excluir "{video.title}"? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VideoCard;