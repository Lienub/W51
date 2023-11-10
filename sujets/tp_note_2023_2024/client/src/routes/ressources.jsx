import { useLoaderData, useFetcher, Outlet } from 'react-router-dom';

import * as api from '@/api';

export async function loader({ params }) {
  const data = await api.getSemestreRessources(params.semestreId);
  
  return {ressources : data, semestreID : params.semestreId ?? []};
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
  let data = useLoaderData();
  let fetcher = useFetcher();
  return <>
    {/* formulaire d'ajout d'une ressource (géré par un fetcher) */}
    <fetcher.Form method="post" action={`/semestres/${data.semestreID}/ressources`}>
      Nom :<input type="text" name="nom" id="nom" />
      <br/>
      Nbh CM : <input type="text" name="hcm" id="hcm" />
      Nbh TD : <input type="text" name="htd" id="htd" />
      Nbh TP : <input type="text" name="htp" id="htp" />
      <br/>
      <button type="submit">Ajouter une ressource </button>
    </fetcher.Form>
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
