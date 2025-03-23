import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Playlist } from '../types';
import { useAppContext } from '../context/AppContext';

interface PlaylistCardProps {
  playlist: Playlist;
  onSelect: (playlist: Playlist) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onSelect }) => {
  const { updatePlaylist, deletePlaylist, videos } = useAppContext();
  
  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Edit form state
  const [editName, setEditName] = useState(playlist.name);
  const [editDescription, setEditDescription] = useState(playlist.description);
  const [nameError, setNameError] = useState('');
  
  // Get the count of videos in this playlist
  const videoCount = playlist.videos.length;
  
  // Get the first video thumbnail for the playlist cover
  const playlistThumbnail = playlist.videos.length > 0
    ? videos.find(v => v.id === playlist.videos[0])?.thumbnail || ''
    : '';
  
  // Handle menu open
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  
  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // For Dialog onClose events (different signature)
  const handleDialogClose = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setEditName(playlist.name);
    setEditDescription(playlist.description);
    setNameError('');
  };
  
  // Handle edit dialog
  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setEditDialogOpen(true);
    handleMenuClose();
  };
  
  const handleEditClose = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      event.stopPropagation();
    }
    setEditDialogOpen(false);
    setEditName(playlist.name);
    setEditDescription(playlist.description);
    setNameError('');
  };
  
  const handleEditSave = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    
    if (!editName.trim()) {
      setNameError('Playlist name is required');
      return;
    }
    
    updatePlaylist(playlist.id, { 
      name: editName.trim(), 
      description: editDescription.trim() 
    });
    
    setEditDialogOpen(false);
  };
  
  // Handle delete dialog
  const handleDeleteClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setDeleteDialogOpen(true);
    handleMenuClose();
  };
  
  const handleDeleteClose = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      event.stopPropagation();
    }
    setDeleteDialogOpen(false);
  };
  
  const handleDeleteConfirm = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    deletePlaylist(playlist.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea 
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
          onClick={() => onSelect(playlist)}
        >
          <Box 
            sx={{ 
              height: 140, 
              backgroundImage: playlistThumbnail ? `url(${playlistThumbnail})` : 'none',
              backgroundColor: playlistThumbnail ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {!playlistThumbnail && (
              <Typography variant="h6" color="text.secondary">
                No videos
              </Typography>
            )}
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div" noWrap>
              {playlist.name}
            </Typography>
            {playlist.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {playlist.description}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              {videoCount} {videoCount === 1 ? 'video' : 'videos'}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton 
            onClick={handleMenuClick} 
            aria-label="more options"
            sx={{ ml: 'auto' }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Card>

      {/* Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        MenuListProps={{
          'aria-labelledby': 'playlist-options-button',
        }}
      >
        <MenuItem onClick={handleEditClick}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleDialogClose}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle>Edit Playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Playlist Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editName}
            onChange={(e) => {
              setEditName(e.target.value);
              if (e.target.value.trim()) {
                setNameError('');
              }
            }}
            error={!!nameError}
            helperText={nameError}
            required
          />
          <TextField
            margin="dense"
            label="Description (optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleDialogClose}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle>Delete Playlist</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{playlist.name}"? This action cannot be undone.
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

export default PlaylistCard;