import React, { useState } from 'react';
import { Grid, Typography, Box, Dialog, DialogContent, IconButton, Button, TextField } from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import VideoCard from './VideoCard';
import { TikTokVideo } from '../types';
import { useAppContext } from '../context/AppContext';

interface VideoGridProps {
  videos: TikTokVideo[];
  title?: string;
  emptyMessage?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  title = 'Videos', 
  emptyMessage = 'No videos found' 
}) => {
  const { updateVideo } = useAppContext();
  const [selectedVideo, setSelectedVideo] = useState<TikTokVideo | null>(null);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [editThumbnailOpen, setEditThumbnailOpen] = useState(false);
  const [newThumbnailUrl, setNewThumbnailUrl] = useState('');

  const handlePlayVideo = (video: TikTokVideo) => {
    setSelectedVideo(video);
    setVideoDialogOpen(true);
  };

  const handleCloseVideo = () => {
    setVideoDialogOpen(false);
    setTimeout(() => {
      setSelectedVideo(null);
    }, 300);
  };

  const handleEditThumbnail = () => {
    if (selectedVideo) {
      setNewThumbnailUrl(selectedVideo.thumbnail);
      setEditThumbnailOpen(true);
    }
  };

  const handleSaveThumbnail = () => {
    if (selectedVideo && newThumbnailUrl) {
      updateVideo(selectedVideo.id, { thumbnail: newThumbnailUrl });
      setSelectedVideo({
        ...selectedVideo,
        thumbnail: newThumbnailUrl
      });
    }
    setEditThumbnailOpen(false);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {title && (
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{
            fontWeight: 600,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: 60,
              height: 4,
              borderRadius: 2,
              backgroundColor: 'primary.main',
            }
          }}
        >
          {title}
        </Typography>
      )}

      {videos.length === 0 ? (
        <Box 
          sx={{ 
            py: 8, 
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: 2,
            border: '1px dashed rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography color="text.secondary">
            {emptyMessage}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
              <VideoCard video={video} onPlay={handlePlayVideo} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Video Player Dialog */}
      <Dialog
        open={videoDialogOpen}
        onClose={handleCloseVideo}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            m: { xs: 1, sm: 2 },
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            p: 1.5,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            backgroundColor: 'rgba(0,0,0,0.02)'
          }}
        >
          <Button 
            startIcon={<EditIcon />} 
            onClick={handleEditThumbnail}
            size="small"
            variant="outlined"
            sx={{ 
              borderRadius: 4,
              px: 2,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Alterar Imagem
          </Button>
          <IconButton 
            onClick={handleCloseVideo} 
            aria-label="close" 
            size="small"
            sx={{ 
              backgroundColor: 'rgba(0,0,0,0.04)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.08)',
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedVideo && (
            <>
              <Box sx={{ p: 2, pb: 1 }}>
                <Typography 
                  variant="subtitle1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    lineHeight: 1.3
                  }}
                >
                  {selectedVideo.title}
                </Typography>
              </Box>
              <Box 
                sx={{ 
                  position: 'relative',
                  paddingBottom: '177.77%', // Proporção 9:16 para vídeos TikTok
                  height: 0,
                  overflow: 'hidden',
                  backgroundColor: '#000',
                  width: '100%',
                  flexGrow: 1
                }}
              >
                {/* iframe remains the same */}
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${selectedVideo.url.split('/').pop()}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                  sandbox="allow-same-origin allow-scripts allow-popups"
                />
                {/* Fallback message with improved styling */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white'
                  }}
                  className="embed-fallback"
                >
                  <Typography variant="body1" gutterBottom>
                    TikTok embed could not be loaded.
                  </Typography>
                  <Button 
                    variant="contained" 
                    href={selectedVideo.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      mt: 2,
                      borderRadius: 6,
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Open in TikTok
                  </Button>
                </Box>
              </Box>
              <Box sx={{ p: 2, pt: 1, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  By: <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{selectedVideo.author}</Box>
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Thumbnail Dialog with improved styling */}
      <Dialog
        open={editThumbnailOpen}
        onClose={() => setEditThumbnailOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '80vh',
            overflow: 'visible',
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            p: 2, 
            pb: 1,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            backgroundColor: 'rgba(0,0,0,0.02)'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
            Alterar Imagem
          </Typography>
          <IconButton 
            onClick={() => setEditThumbnailOpen(false)} 
            size="small"
            sx={{ 
              backgroundColor: 'rgba(0,0,0,0.04)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.08)',
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="URL da Imagem"
            value={newThumbnailUrl}
            onChange={(e) => setNewThumbnailUrl(e.target.value)}
            margin="normal"
            size="small"
            helperText="Insira a URL de uma nova imagem para este vídeo"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5
              }
            }}
          />
          {newThumbnailUrl && (
            <Box 
              sx={{ 
                mt: 2, 
                mb: 2,
                p: 1,
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 1,
                backgroundColor: 'rgba(0,0,0,0.02)'
              }}
            >
              <Box
                component="img"
                src={newThumbnailUrl}
                alt="Pré-visualização"
                sx={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '9/16',
                  objectFit: 'cover',
                  borderRadius: 1,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = 'https://via.placeholder.com/320x568?text=Imagem+Inválida';
                }}
              />
            </Box>
          )}
        </DialogContent>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            p: 2, 
            pt: 1,
            borderTop: '1px solid rgba(0,0,0,0.08)',
            backgroundColor: 'rgba(0,0,0,0.02)'
          }}
        >
          <Button 
            onClick={() => setEditThumbnailOpen(false)} 
            sx={{ 
              mr: 1,
              borderRadius: 4,
              px: 2,
              textTransform: 'none'
            }}
            size="small"
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveThumbnail}
            disabled={!newThumbnailUrl}
            size="small"
            sx={{ 
              borderRadius: 4,
              px: 3,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Salvar
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default VideoGrid;