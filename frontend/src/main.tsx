import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '~/app/App.tsx'
import './assets/css/index.scss'
import { ThemeProvider } from '@mui/material';
import { theme } from '~/bundles/common/themes/theme.js';
import { StyledEngineProvider } from '@mui/material/styles';
import { store } from './framework/store/store';
import { StoreProvider } from './bundles/common/components/components';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StoreProvider store={store}>
          <App />
        </StoreProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
