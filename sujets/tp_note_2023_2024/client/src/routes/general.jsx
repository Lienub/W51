import { Form, useLoaderData, useNavigation, useParams } from 'react-router-dom';

import * as api from '@/api';

export function loader({ params }) {
  // TODO: récupérer les données nécessaires auprès de l'API
  return null; // à supprimer
}

export function action({ request, params }) {
  return request.formData()
    .then(formData => api.updateSemestre(params.semestreId, Object.fromEntries(formData)));
}

export default function General() {
  // TODO: récupérer les données du loader
  // (on peut récupérer l'id du semestre courant depuis les params de la route)

  return <Form method="PUT">
    {/* affichage des informations du semestre
        les valeurs initiales des input peuvent être
        mises grâce à la propriété "defaultValue" */}
  </Form>;
}
