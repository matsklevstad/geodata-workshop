import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material";


const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontWeightBold: 300,
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#4C3C43"
          },

          "&.Mui-disabled": {
            backgroundColor: "#2E2428",
            color: "grey",
          },
          backgroundColor: "#4C3C43",
          color: "white"        
        },    
      },
    },
    
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </React.StrictMode>
);
