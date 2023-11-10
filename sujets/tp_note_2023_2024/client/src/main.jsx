import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import '@/index.css';

import Root from '@/routes/root';
import Semestres, { loader as semestresLoader, action as semestresAction } from '@/routes/semestres';
import Semestre, { loader as semestreLoader, action as semestreAction } from '@/routes/semestre';
import General, { loader as generalLoader, action as generalAction } from '@/routes/general';
import UEs, { loader as UEsLoader, action as UEsAction } from '@/routes/ues';
import Ressources, { loader as ressourcesLoader, action as ressourcesAction } from '@/routes/ressources';
import Total, { loader as totalLoader } from '@/routes/total';

import Error from '@/error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: 'semestres',
        loader: semestresLoader,
        action: semestresAction,
        element: <Semestres />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <div>
              <h2>Sélectionner un semestre ou en créer un nouveau</h2>
            </div>,
          },
          {
            path: ':semestreId',
            loader: semestreLoader,
            action: semestreAction,
            element: <Semestre />,
            errorElement: <Error />,
            children: [
              {
                path: 'general',
                loader: generalLoader,
                action: generalAction,
                element: <General />
              },
              {
                path: 'ues',
                loader: UEsLoader,
                action: UEsAction,
                element: <UEs />
              },
              {
                path: 'ressources',
                loader: ressourcesLoader,
                action: ressourcesAction,
                element: <Ressources />
              },
              {
                path: 'total',
                loader: totalLoader,
                element: <Total />
              }
            ]
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
