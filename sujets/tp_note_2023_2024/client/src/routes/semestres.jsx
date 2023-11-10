import { Link, Outlet, Form, NavLink, useLoaderData, useNavigation, redirect, json } from 'react-router-dom';
import { useEffect, useState} from 'react';


import * as api from '@/api';

export async function loader() {
  const data = await api.getSemestres();

  return { semestres: data ?? [] };
}

export async function action({ request }) {
  // TODO: récupérer les informations nécessaires du formulaire soumis
  // + demander à l'API de créer une nouvelle ressource
  // + redirection vers la page du semestre créé
  let formData = await request.formData();
  let data = Object.fromEntries(formData);
  let res = await api.createSemestre({intitule: data['semestre']});

  return redirect(`/semestres/${res.id}`);
}

export default function Semestres() {
  // TODO: récupérer les données du loader
  const data = useLoaderData();

    useEffect(() => {
      document.getElementById('semestre').value = ""
  }, [data.semestre]);

  return (
    <>
      <div id="sidebar">
        <h1><Link to="/semestres">Semestres</Link></h1>
        {/* formulaire d'ajout d'un semestre */}
        <Form method="POST" action="/semestres">
          <input type="text" name="semestre" id="semestre" />
          <button type="submit">Ajouter</button>
        </Form>
        <nav>
          {/* affichage des semestres (sous forme de liens) */}
          {data.semestres.map((semestre) => (
            <li key={semestre.id}>
              <NavLink to={`/semestres/${semestre.id}`}>{semestre.intitule}</NavLink>
            </li>
          ))}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
