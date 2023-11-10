import { Form, useLoaderData, useNavigation, useParams, redirect, NavLink, Outlet } from 'react-router-dom';

import * as api from '@/api';

export async function loader({ params }) {
  const data = await api.getSemestre(params.semestreId);
  return { semestre: data ?? [] };
}

export async function action({ request, params }) {
  switch (request.method) {
    case 'DELETE': {
      // demander à l'API de supprimer le semestre courant
      // + redirection vers la liste des semestres
      await api.deleteSemestre(params.semestreId)
      return redirect(`/semestres`);
    }
  }
}

export default function Semestre() {
  // TODO: récupérer les données du loader
  // (on peut récupérer l'id du semestre courant depuis les params de la route)
  let data = useLoaderData();

  let handleSubmit = (event) => {
    if(!confirm("Are you sure you want to delete this list?")){
        event.preventDefault();
    }
  }

  return <div>
    {/* affichage des informations du semestre
        et du bouton de suppression (Form) */}
    <div style={{display:"flex", flexShrink:0}}>
      <h1>{data.semestre.intitule}</h1>
      <Form method="delete"  action={`/semestres/${data.semestre.id}`} onSubmit={handleSubmit}  style={{alignSelf:"center", marginLeft:'auto'}}>
        <button className="danger" type="submit">
            Supprimer
        </button>
      </Form>
    </div>
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
