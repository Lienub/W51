'use_strict';

const
  db = require('../models');

module.exports = {

  get_by_id: (req, res, next) => {
    return db.Ressource.findByPk(req.params.ressource_id)
      .then((ressource) => {
        if (!ressource) {
          throw { status: 404, message: 'Ressource not found' };
        }
        return ressource.getUEs({ attributes: [] });
      })
      .then((UEs) => res.json(UEs))
      .catch(next);
  },

  create: (req, res, next) => {
    return db.Semestre.findByPk(req.params.semestre_id)
      .then((semestre) => {
        if (!semestre) {
          throw { status: 404, message: 'Semestre not found' };
        }
        return semestre.createRessource(req.body);
      })
      .then((ressource) => res.json(ressource))
      .catch(next);
  },

  update_by_id: (req, res, next) => {
    return db.Ressource.findByPk(req.params.ressource_id)
      .then((ressource) => {
        if (!ressource) {
          throw { status: 404, message: 'Ressource not found' };
        }
        Object.assign(ressource, req.body);
        return ressource.save();
      })
      .then((ressource) => res.json(ressource))
      .catch(next);
  },

  delete_by_id: (req, res, next) => {
    return db.Ressource.findByPk(req.params.ressource_id)
      .then((ressource) => {
        if (!ressource) {
          throw { status: 404, message: 'Ressource not found' };
        }
        return ressource.destroy();
      })
      .then(() => res.status(200).end())
      .catch(next);
  },

  set_coefficient: (req, res, next) => {
    return db.Ressource.findByPk(req.params.ressource_id)
      .then((ressource) => {
        if (!ressource) {
          throw { status: 404, message: 'Ressource not found' };
        }
        return ressource.addUE(req.body.ue, { through: { valeur: req.body.valeur } });
      })
      .then(() => res.status(200).end())
      .catch(next);
  }

};
