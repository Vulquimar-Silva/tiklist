import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Switch, 
  FormControlLabel, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  FormGroup
} from '@mui/material';
import { useAppContext } from '../context/AppContext';

const SettingsPage: React.FC = () => {
  const { user, updateUserPreferences } = useAppContext();
  
  const handleAutoplayToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserPreferences({ 
      darkMode: user.preferences.darkMode,
      autoplay: event.target.checked 
    });
  };

  const handleMuteToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUserPreferences({ 
      darkMode: user.preferences.darkMode,
      muteVideos: event.target.checked 
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <List subheader={<ListSubheader>Video Playback Settings</ListSubheader>}>
          <ListItem>
            <FormControlLabel
              control={
                <Switch
                  checked={user.preferences.autoplay ?? true}
                  onChange={handleAutoplayToggle}
                  color="primary"
                />
              }
              label="Autoplay videos"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={
                <Switch
                  checked={user.preferences.muteVideos ?? false}
                  onChange={handleMuteToggle}
                  color="primary"
                />
              }
              label="Start videos muted"
            />
          </ListItem>
        </List>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography variant="body2" paragraph>
          TikTok List is a platform that allows you to organize and manage your favorite TikTok videos.
        </Typography>
        <Typography variant="body2" paragraph>
          Version: 1.0.0
        </Typography>
      </Paper>
    </Box>
  );
};

export default SettingsPage;