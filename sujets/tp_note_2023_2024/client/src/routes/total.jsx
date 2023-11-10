import { useLoaderData } from 'react-router-dom';

import * as api from '@/api';

export function loader({ params }) {
  const data = api.getSemestreRessources(params.semestreId);
  let cm = 0;
  let td = 0;
  let tp = 0;
  data.map((ressource) => {
    cm += ressource.hcm;
    td += ressource.htd;
    tp += ressource.htp;
  });

  return {cm : cm, td : td, tp : tp};
}

export default function Infos() {
  // TODO: récupérer les données du loader
  let data = useLoaderData();
  return <>
    <h4>Total heures étudiant:</h4>
    CM :{data.cm}
    <br/>
    TD :{data.td}
    <br/>
    TP :{data.tp}
    <br/>
    TOTAL :{data.cm + data.td + data.tp} 
    <h4>Total heures enseignant:</h4>
    CM :{data.cm * 1.5}
    <br/>
    TD :{data.td * 1.5}
    <br/>
    TP :{data.tp * 0.66}
    <br/>
    TOTAL :{data.cm * 1.5 + data.td * 1.5 + data.tp * 0.66}
  </>;
}
