import { createTheme } from '@mui/material/styles';

// Create a custom theme with ICECD colors and improved design
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e4c78', // Deeper blue for ICECD
      light: '#5176a4',
      dark: '#00274f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff7043', // Warm orange for actions/highlights
      light: '#ffa270',
      dark: '#c63f17',
      contrastText: '#000000',
    },
    success: {
      main: '#4caf50',
      light: '#80e27e',
      dark: '#087f23',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: '0 2px 10px 0 rgba(0,0,0,0.1)',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 4px 15px 0 rgba(30,76,120,0.3)',
          },
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0 4px 15px 0 rgba(255,112,67,0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            transform: 'translateY(-5px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 2px 10px 0 rgba(0,0,0,0.05)',
        },
        elevation2: {
          boxShadow: '0 4px 15px 0 rgba(0,0,0,0.05)',
        },
        elevation3: {
          boxShadow: '0 6px 20px 0 rgba(0,0,0,0.07)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#f2f5f9',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #fff',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;