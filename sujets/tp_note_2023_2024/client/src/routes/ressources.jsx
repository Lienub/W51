import { useLoaderData, useFetcher, Outlet } from 'react-router-dom';

import * as api from '@/api';

export function loader({ params }) {
  // TODO: récupérer les données nécessaires auprès de l'API
  return []; // à supprimer
}

export function action({ request, params }) {
  switch (request.method) {
    case 'POST': {
      // TODO: récupérer les informations nécessaires du formulaire soumis
      // + demander à l'API de créer une nouvelle ressource
    }
    case 'DELETE': {
      // TODO: récupérer les informations nécessaires du formulaire soumis
      // + demander à l'API de supprimer la ressource
    }
  }
  return null; // à supprimer
}

export default function Ressources() {
  // TODO: récupérer les données du loader

  return <>
    {/* formulaire d'ajout d'une ressource (géré par un fetcher) */}

    {/* affichage des ressources */}
  </>;
}

function Ressource({ ressource }) {
  // Ce composant local peut gérer l'affichage
  // et la suppression de chaque ressource

  return <tr>
    {/* affichage des informations de la ressource
        et du bouton de suppression (formulaire géré par un fetcher) */}
  </tr>;
}
