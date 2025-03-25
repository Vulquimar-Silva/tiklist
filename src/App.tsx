import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PlaylistsPage from './pages/PlaylistsPage';
import PlaylistPage from './pages/PlaylistPage';
import SettingsPage from './pages/SettingsPage';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppContext } from './context/AppContext';

// Componente para gerenciar o tema
const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppContext();
  
  const theme = createTheme({
    palette: {
      mode: user.preferences.darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

// Componente principal da aplicação
const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/playlists" element={<PlaylistsPage />} />
      <Route path="/playlist/:id" element={<PlaylistPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppThemeProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AppThemeProvider>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
