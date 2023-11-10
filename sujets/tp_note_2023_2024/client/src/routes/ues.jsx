import { useLoaderData, useFetcher } from 'react-router-dom';

import * as api from '@/api';

export function loader({ params }) {
  // TODO: récupérer les données nécessaires auprès de l'API
  return []; // à supprimer
}

export function action({ request, params }) {
  switch (request.method) {
    case 'POST': {
      // TODO: récupérer les informations nécessaires du formulaire soumis
      // + demander à l'API de créer une nouvelle UE
    }
    case 'DELETE': {
      // TODO: récupérer les informations nécessaires du formulaire soumis
      // + demander à l'API de supprimer l'UE
    }
  }
  return null; // à supprimer
}

export default function UEs() {
  // TODO: récupérer les données du loader

  return <>
    {/* formulaire d'ajout d'une UE (géré par un fetcher) */}

    {/* affichage des UE */}
  </>;
}

function UE({ ue }) {
  // Ce composant local peut gérer l'affichage
  // et la suppression de chaque UE

  return <li>
    {/* affichage des informations de l'UE
        et du bouton de suppression (formulaire géré par un fetcher) */}
  </li>;
}
