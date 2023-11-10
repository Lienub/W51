import { Link, Outlet, Form, NavLink, useLoaderData, useNavigation, redirect } from 'react-router-dom';

import * as api from '@/api';

export function loader() {
  // TODO: récupérer les données nécessaires auprès de l'API
  return []; // à supprimer
}

export function action({ request }) {
  // TODO: récupérer les informations nécessaires du formulaire soumis
  // + demander à l'API de créer une nouvelle ressource
  // + redirection vers la page du semestre créé
  return null; // à supprimer
}

export default function Semestres() {
  // TODO: récupérer les données du loader

  return (
    <>
      <div id="sidebar">
        <h1><Link to="/semestres">Semestres</Link></h1>
        {/* formulaire d'ajout d'un semestre */}
        <nav>
          {/* affichage des semestres (sous forme de liens) */}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
