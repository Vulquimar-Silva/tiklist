import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Container, 
  Grid,
  InputAdornment,
  alpha
} from '@mui/material';
import { VideoLibrary as VideoIcon, Add as AddIcon } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import VideoGrid from '../components/VideoGrid';
import { v4 as uuidv4 } from 'uuid';
import { TikTokVideo } from '../types';
import { extractVideoInfo } from '../services/tiktokService';

const HomePage: React.FC = () => {
  const { videos, addVideo } = useAppContext();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddVideo = async () => {
    if (!url.trim()) {
      setError('Please enter a TikTok URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const videoInfo = await extractVideoInfo(url);
      
      const newVideo: TikTokVideo = {
        id: uuidv4(),
        url: url,
        title: videoInfo.title || 'TikTok Video',
        author: videoInfo.author || 'Unknown Creator',
        thumbnail: videoInfo.thumbnail || 'https://via.placeholder.com/320x568?text=TikTok+Video',
        duration: videoInfo.duration || 0,
        addedAt: new Date(),
      };
      
      addVideo(newVideo);
      setUrl('');
    } catch (err) {
      setError('Failed to add video. Please check the URL and try again.');
      console.error('Error adding video:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            borderRadius: 3,
            background: (theme) => `linear-gradient(145deg, 
              ${alpha(theme.palette.primary.main, 0.1)} 0%, 
              ${alpha(theme.palette.primary.dark, 0.2)} 100%)`,
            border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            mb: 4
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 1
                }}
              >
                Add TikTok Video
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Paste a TikTok video URL to add it to your collection
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="TikTok Video URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  error={!!error}
                  helperText={error}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VideoIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { 
                      borderRadius: 2,
                      backgroundColor: 'background.paper'
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddVideo}
                  disabled={loading || !url.trim()}
                  startIcon={<AddIcon />}
                  sx={{ 
                    px: 3, 
                    py: { xs: 1.5, sm: 'auto' },
                    borderRadius: 2,
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 2
                  }}
                >
                  {loading ? 'Adding...' : 'Add Video'}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box 
                component="img" 
                src="/tiktok-illustration.PNG" 
                alt="TikTok Videos"
                sx={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  maxHeight: 180,
                  borderRadius: 2
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: 'primary.main',
              }
            }}
          >
            Recently Added Videos
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {videos.length} {videos.length === 1 ? 'video' : 'videos'} na sua coleção
          </Typography>
        </Box>
        
        <VideoGrid videos={videos} emptyMessage="No videos yet. Add your first TikTok video above!" />
      </Box>
    </Container>
  );
};

export default HomePage;