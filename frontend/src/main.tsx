import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '~/app/App.tsx'
import './assets/css/index.scss'
import { ThemeProvider } from '@mui/material';
import { theme } from '~/bundles/common/themes/theme.js';
import { StyledEngineProvider } from '@mui/material/styles';
import { store } from './framework/store/store';
import { StoreProvider } from './bundles/common/components/components';
import { NotFoundPage } from './bundles/workspace/pages/not-found/not-found';
import { AppRoute } from './bundles/common/enums/enums';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TaskBoard } from './bundles/task-board/components/board/board';

const router = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: <App />,
    children: [
      {
        path: AppRoute.BOARDS,
      }
    ],
  },
  {
    path: AppRoute.BOARD,
    element: <TaskBoard />,
  },
  {
    path: AppRoute.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: AppRoute.OTHER,
    element: <NotFoundPage />,
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StoreProvider store={store}>
          <RouterProvider router={router} />
        </StoreProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
