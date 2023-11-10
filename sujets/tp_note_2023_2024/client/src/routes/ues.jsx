import { useLoaderData, useFetcher } from 'react-router-dom';

import * as api from '@/api';

export async function loader({ params }) {
  const data = await api.getSemestreUEs(params.semestreId)

  return {ues : data ?? [], semestreID: params.semestreId}
}

export async function action({ request, params }) {
  let formData = await request.formData();
  let data = Object.fromEntries(formData);
  switch (request.method) {
    case 'POST': {
      await api.createUE(params.semestreId, {intitule: data['intitule'], intitule_court: data['intitule_court']});
    }
    case 'DELETE': {
      await api.deleteUE(params.semestreId, data['ue']);
    }
  }
  return formData;
}

export default function UEs() {
  // TODO: récupérer les données du loader
  let data = useLoaderData();
  let fetcher = useFetcher();
  return <>
    <div>
      {/* formulaire d'ajout d'une UE (géré par un fetcher) */}
      <fetcher.Form method="post" action={`/semestres/${data.semestreID}/ues`}>
        Intitulé <input type="text" name="intitule" id="intitule" />
         Intitulé court <input type="text" name="intitule_court" id="intitule_court" />
        <button type="submit">Ajouter</button>
      </fetcher.Form>
      {/* affichage des UE */}
      <ul style={{display:"flex", flexShrink:0, flexDirection:"column"}}>
        {data.ues.map((ue) => (
            <UE ue={ue} style={{display:"flex", flexShrink:0}}/>
        ))}
      </ul>
    </div>
  </>;
}

function UE({ ue }) {
  let fetcher = useFetcher();
  // Ce composant local peut gérer l'affichage
  // et la suppression de chaque UE
  return <li key={ue.id}>
    {/* affichage des informations de l'UE
        et du bouton de suppression (formulaire géré par un fetcher) */}
    {ue.intitule_court} - {ue.intitule} 
    <fetcher.Form method="delete" action={`/semestres/${ue.SemestreId}/ues`}>
      <button type="submit" className="danger" name="ue" id="ue" value={ue.id}>Supprimer</button>
    </fetcher.Form>
  </li>;
}
