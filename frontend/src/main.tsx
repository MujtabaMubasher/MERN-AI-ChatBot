import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import axios from 'axios'
// for showing the popup on the screen 
import {Toaster} from 'react-hot-toast'

 axios.defaults.baseURL =
  "https://turbo-winner-9xg9g96xqp5fpr79-5000.app.github.dev/api/v1";
 // For Helping to Exchange the cookies with backend
 axios.defaults.withCredentials = true
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: {color: 'white'}
  }
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
          <Toaster position = "top-center"/>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
