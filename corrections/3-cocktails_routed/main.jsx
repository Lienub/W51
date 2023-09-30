import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Navigate
} from 'react-router-dom';

import '@/index.css';

import Root from '@/routes/root';
import Error from '@/error';

import Cocktails, { loader as cocktailsLoader } from '@/routes/cocktails';
import Cocktail, { loader as cocktailLoader } from '@/routes/cocktail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'cocktails',
        loader: cocktailsLoader,
        element: <Cocktails />,
        errorElement: <Error />,
        children: [
          {
            path: ':cocktailId',
            loader: cocktailLoader,
            element: <Cocktail />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
], {
  future: {
    v7_normalizeFormMethod: true,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
