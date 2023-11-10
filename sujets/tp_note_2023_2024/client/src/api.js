
let prefix = 'http://localhost:4200';

function checkStatus(res) {
  if (res.ok) {
    return res;
  } else {
    throw res;
  }
};

//////////////
// SEMESTRE //
//////////////

export function getSemestres() {
  return fetch(`${prefix}/semestre`)
    .then(checkStatus)
    .then(res => res.json());
}

export function createSemestre(semestre) {
  return fetch(`${prefix}/semestre`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(semestre)
  })
    .then(checkStatus)
    .then((res) => res.json());
}

export function getSemestre(semestre_id) {
  return fetch(`${prefix}/semestre/${semestre_id}`)
    .then(checkStatus)
    .then(res => res.json());
}

export function updateSemestre(semestre_id, semestre) {
  return fetch(`${prefix}/semestre/${semestre_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(semestre)
  })
    .then(checkStatus)
    .then((res) => res.json());
}

export function deleteSemestre(semestre_id) {
  return fetch(`${prefix}/semestre/${semestre_id}`, {
    method: 'DELETE'
  })
    .then(checkStatus);
}

/////////
// UES //
/////////

export function getSemestreUEs(semestre_id) {
  return fetch(`${prefix}/semestre/${semestre_id}/ue`)
    .then(checkStatus)
    .then(res => res.json());
}

export function createUE(semestre_id, ue) {
  return fetch(`${prefix}/semestre/${semestre_id}/ue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ue)
  })
    .then(checkStatus)
    .then((res) => res.json());
}

export function getUE(semestre_id, ue_id) {
  return fetch(`${prefix}/semestre/${semestre_id}/ue/${ue_id}`)
    .then(checkStatus)
    .then(res => res.json());
}

export function updateUE(semestre_id, ue_id, ue) {
  return fetch(`${prefix}/semestre/${semestre_id}/ue/${ue_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ue)
  })
    .then(checkStatus)
    .then((res) => res.json());
}

export function deleteUE(semestre_id, ue_id) {
  return fetch(`${prefix}/semestre/${semestre_id}/ue/${ue_id}`, {
    method: 'DELETE'
  })
    .then(checkStatus);
}

////////////////
// RESSOURCES //
////////////////

export function getSemestreRessources(semestre_id) {
  return fetch(`${prefix}/semestre/${semestre_id}/ressource`)
    .then(checkStatus)
    .then(res => res.json());
}

export function createRessource(semestre_id, ressource) {
  return fetch(`${prefix}/semestre/${semestre_id}/ressource`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ressource)
  })
    .then(checkStatus)
    .then((res) => res.json());
}

export function getRessource(semestre_id, ressource_id) {
  return fetch(`${prefix}/semestre/${semestre_id}/ressource/${ressource_id}`)
    .then(checkStatus)
    .then(res => res.json());
}

export function updateRessource(semestre_id, ressource_id, ressource) {
  return fetch(`${prefix}/semestre/${semestre_id}/ressource/${ressource_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ressource)
  })
    .then(checkStatus)
    .then((res) => res.json());
}

export function deleteRessource(semestre_id, ressource_id) {
  return fetch(`${prefix}/semestre/${semestre_id}/ressource/${ressource_id}`, {
    method: 'DELETE'
  })
    .then(checkStatus);
}
