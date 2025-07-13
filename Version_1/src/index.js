import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';
import theme from './assets/styles/theme';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ChatProvider } from './context/ChatContext';
import { LanguageProvider } from './context/LanguageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <DataProvider>
            <ChatProvider>
              <App />
            </ChatProvider>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);