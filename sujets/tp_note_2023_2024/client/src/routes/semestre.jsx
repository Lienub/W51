import { Form, useLoaderData, useNavigation, useParams, redirect, NavLink, Outlet } from 'react-router-dom';

import * as api from '@/api';

export function loader({ params }) {
  // TODO: récupérer les données nécessaires auprès de l'API
  return null; // à supprimer
}

export function action({ request, params }) {
  switch (request.method) {
    case 'DELETE': {
      // demander à l'API de supprimer le semestre courant
      // + redirection vers la liste des semestres
    }
  }
  return null; // à supprimer
}

export default function Semestre() {
  // TODO: récupérer les données du loader
  // (on peut récupérer l'id du semestre courant depuis les params de la route)

  return <div>
    {/* affichage des informations du semestre
        et du bouton de suppression (Form) */}
    <hr />
    <nav>
      <NavLink to={`general`}>General</NavLink>{' '}
      <NavLink to={`ues`}>UEs</NavLink>{' '}
      <NavLink to={`ressources`}>Ressources</NavLink>
      <NavLink to={`total`}>Total</NavLink>
    </nav>
    <hr />
    <Outlet />
  </div>;
}
