import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { Playlist } from '../types';

const PlaylistForm: React.FC = () => {
  const { addPlaylist } = useAppContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setNameError('');
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError('Playlist name is required');
      return;
    }

    const newPlaylist: Playlist = {
      id: Math.random().toString(36).substring(2, 15),
      name: name.trim(),
      description: description.trim(),
      videos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addPlaylist(newPlaylist);
    handleClose();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Create New Playlist
      </Typography>
      
      <Button variant="contained" color="primary" onClick={handleOpen} fullWidth>
        Create Playlist
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create New Playlist</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Playlist Name"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PlaylistForm;