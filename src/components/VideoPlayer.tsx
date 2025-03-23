import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { 
  PlayArrow as PlayIcon, 
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  SkipNext as SkipNextIcon
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

interface VideoPlayerProps {
  videoId: string;
  embedHtml: string;
  onVideoEnd?: () => void;
  autoplay?: boolean;
  nextVideoId?: string;
  onNextVideo?: (videoId: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoId, 
  embedHtml, 
  onVideoEnd,
  autoplay = true,
  nextVideoId,
  onNextVideo
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false); // Iniciar desmutado
  const [isLoading, setIsLoading] = useState(true);

  // Função para controlar o player do TikTok
  const postMessageToPlayer = (action: string) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          method: action
        }),
        '*'
      );
    }
  };

  // Configurar o listener de mensagens para detectar quando o vídeo terminar
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'video-ended') {
          setIsPlaying(false);
          if (onVideoEnd) onVideoEnd();
          
          // Reproduzir próximo vídeo automaticamente
          if (nextVideoId && onNextVideo) {
            setTimeout(() => {
              onNextVideo(nextVideoId);
            }, 500);
          }
        }
      } catch (e) {
        // Ignorar mensagens que não são JSON
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onVideoEnd, nextVideoId, onNextVideo]);

  // Iniciar reprodução quando o componente montar
  useEffect(() => {
    if (autoplay) {
      const timer = setTimeout(() => {
        postMessageToPlayer('play');
        setIsPlaying(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoplay]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    if (!isMuted) {
      postMessageToPlayer('unmute');
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      postMessageToPlayer('pause');
    } else {
      postMessageToPlayer('play');
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isMuted) {
      postMessageToPlayer('unmute');
    } else {
      postMessageToPlayer('mute');
    }
    setIsMuted(!isMuted);
  };

  const handleNextVideo = () => {
    if (nextVideoId && onNextVideo) {
      onNextVideo(nextVideoId);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.1)'
        }}>
          <CircularProgress />
        </Box>
      )}
      
      <Box 
        dangerouslySetInnerHTML={{ __html: embedHtml }} 
        sx={{ width: '100%', height: '100%' }}
      />
      
      <iframe 
        ref={iframeRef}
        style={{ display: 'none' }}
        onLoad={handleIframeLoad}
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        title="TikTok Player"
      />
      
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        p: 1, 
        display: 'flex', 
        alignItems: 'center',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.5))'
      }}>
        <IconButton onClick={togglePlay} size="small" sx={{ color: 'white' }}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
        
        <IconButton onClick={toggleMute} size="small" sx={{ color: 'white', ml: 1 }}>
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
        
        {nextVideoId && (
          <IconButton onClick={handleNextVideo} size="small" sx={{ color: 'white', ml: 1 }}>
            <SkipNextIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default VideoPlayer;