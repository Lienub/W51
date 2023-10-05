import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useParams,
  Link,
  Navigate
} from 'react-router-dom';

import '@/index.css';

import Root from '@/routes/root';
import { CocktailsApp, CocktailApp,cocktailsLoader, cocktailLoader } from '@/routes/cocktails';
import Error from '@/error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'cocktails',
        element: <CocktailsApp />,
        loader: cocktailsLoader,
        children: [
          {
            index: true,
            element: 
            <div>
              <p> Veuillez selectionner un cocktail dans la liste. </p>
            </div>
          },
          {
            path: ':id',
            loader: cocktailLoader,
            element: <CocktailApp />,
            errorElement: <Error />,
          }
        ]
      },
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