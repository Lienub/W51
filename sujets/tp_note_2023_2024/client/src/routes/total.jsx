import { useLoaderData } from 'react-router-dom';

import * as api from '@/api';

export function loader({ params }) {
  // TODO: récupérer les données nécessaires auprès de l'API
  return null; // à supprimer
}

export default function Infos() {
  // TODO: récupérer les données du loader

  return <>
    <h4>Total heures étudiant:</h4>

    <h4>Total heures enseignant:</h4>

  </>;
}
