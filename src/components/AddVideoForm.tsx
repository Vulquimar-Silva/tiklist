import React, { useState } from 'react';
import { Button, TextField, Box, CircularProgress, Typography, Paper } from '@mui/material';
import { extractVideoInfo } from '../services/tiktokService';
import { useAppContext } from '../context/AppContext';
import { TikTokVideo } from '../types';

const AddVideoForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addVideo } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a TikTok URL');
      return;
    }
    
    if (!url.includes('tiktok.com')) {
      setError('Please enter a valid TikTok URL');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const videoInfo = await extractVideoInfo(url);
      addVideo(videoInfo as TikTokVideo);
      setUrl('');
      setLoading(false);
    } catch (err) {
      setError('Failed to extract video information. Please check the URL and try again.');
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Add TikTok Video
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="TikTok Video URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.tiktok.com/@username/video/1234567890123456789"
          error={!!error}
          helperText={error}
          disabled={loading}
          sx={{ mb: 2 }}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Add Video'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddVideoForm;