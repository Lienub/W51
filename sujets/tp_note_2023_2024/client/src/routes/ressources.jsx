import { useLoaderData, useFetcher, Outlet } from 'react-router-dom';

import * as api from '@/api';

export async function loader({ params }) {
  const data = await api.getSemestreRessources(params.semestreId);
  
  return {ressources : data, semestreID : params.semestreId ?? []};
}

export async function action({ request, params }) {
  let formData = await request.formData();
  let data = Object.fromEntries(formData);

  switch (request.method) {
    case 'POST': {
      await api.createRessource(params.semestreId, {nom: data['nom'], hcm: data['hcm'], htd: data['htp'], htp: data['htd']});
    }
    case 'DELETE': {
      await api.deleteRessource(params.semestreId, data['ressource']);
    }
  }
  return formData;
}

export default function Ressources() {
  // TODO: récupérer les données du loader
  let data = useLoaderData();
  let fetcher = useFetcher();
  return <>
    <div>
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
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>CM</th>
            <th>TD</th>
            <th>TP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.ressources.map((ressource) => (
              <Ressource ressource={ressource} style={{display:"flex", flexShrink:0}}/>
          ))}
        </tbody>
      </table>
    </div>
  </>;
}

function Ressource({ ressource }) {
  let fetcher = useFetcher();
  // Ce composant local peut gérer l'affichage
  // et la suppression de chaque ressource

  return <tr>
    {/* affichage des informations de la ressource
        et du bouton de suppression (formulaire géré par un fetcher) */}
        <td>{ressource.nom}</td>
        <td>{ressource.hcm}</td>
        <td>{ressource.htd}</td>
        <td>{ressource.htp}</td>
        <td>
          <fetcher.Form method="delete" action={`/semestres/${ressource.SemestreId}/ressources`}>
            <button type="submit" className="danger" name="ressource" id="ressource" value={ressource.id}>Supprimer</button>
          </fetcher.Form>
        </td>
  </tr>;
}
