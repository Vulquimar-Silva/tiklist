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
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        
Criar nova lista de reprodução
      </Typography>
      
      <Button variant="contained" color="primary" onClick={handleOpen} fullWidth sx={{ py: 1.5 }}>
        Criar Playlist
      </Button>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="sm"
      >
        <DialogTitle>Criar nova Playlist</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Nome da Playlist"
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
              label="Descrição (opcional)"
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
    </Box>
  );
};

export default PlaylistForm;