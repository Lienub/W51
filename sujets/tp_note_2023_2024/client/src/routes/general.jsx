import { Form, useLoaderData, useNavigation, useParams } from 'react-router-dom';

import * as api from '@/api';

export async function loader({ params }) {
  // TODO: récupérer les données nécessaires auprès de l'API
  const data = await api.getSemestre(params.semestreId);
  return {semestre: data ?? []}
}

export function action({ request, params }) {
  return request.formData()
    .then(formData => api.updateSemestre(params.semestreId, Object.fromEntries(formData)));
}

export default function General() {
  let data = useLoaderData();

  return <Form method="PUT">
    {/* affichage des informations du semestre
        les valeurs initiales des input peuvent être
        mises grâce à la propriété "defaultValue" */}
    <ul style={{listStyleType:'none', padding:0}}>
      <li> 
        Intitulé
        <input type="text" name="intitule" id="intitule" defaultValue={data.semestre.intitule} />
      </li>
      <li>  
        Effectif
        <input type="text" name="effectif" id="effectif" defaultValue={data.semestre.effectif} />
      </li>
      <li>
        NB groupes TD
        <input type="text" name="nbGroupesTD" id="nbGroupesTD" defaultValue={data.semestre.nbGroupesTD} />
      </li>
      <li>
        NB groupes TP
        <input type="text" name="nbGroupesTP" id="nbGroupesTP" defaultValue={data.semestre.nbGroupesTP } />
      </li>  
    </ul>

    <button type="submit">Modifier</button>
  </Form>;
}
