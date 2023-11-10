'use_strict';

const
  db = require('../models');

module.exports = {

  get_all: (req, res, next) => {
    return db.Semestre.findAll()
      .then((semestres) => res.json(semestres))
      .catch(next);
  },

  get_by_id: (req, res, next) => {
    return db.Semestre.findByPk(req.params.semestre_id)
      .then((semestre) => {
        if (!semestre) {
          throw { status: 404, message: 'Semestre not found' };
        }
        return res.json(semestre);
      })
      .catch(next);
  },

  create: (req, res, next) => {
    return db.Semestre.create(req.body)
      .then((semestre) => res.json(semestre))
      .catch(next);
  },

  update_by_id: (req, res, next) => {
    return db.Semestre.findByPk(req.params.semestre_id)
      .then((semestre) => {
        if (!semestre) {
          throw { status: 404, message: 'Semestre not found' };
        }
        Object.assign(semestre, req.body);
        return semestre.save();
      })
      .then((semestre) => res.json(semestre))
      .catch(next);
  },

  delete_by_id: (req, res, next) => {
    return db.Semestre.findByPk(req.params.semestre_id)
      .then((semestre) => {
        if (!semestre) {
          throw { status: 404, message: 'Semestre not found' };
        }
        return semestre.destroy();
      })
      .then(() => res.status(200).end())
      .catch(next);
  },

  get_UEs_of_id: (req, res, next) => {
    return db.Semestre.findByPk(req.params.semestre_id)
      .then((semestre) => {
        if (!semestre) {
          throw { status: 404, message: 'Semestre not found' };
        }
        return semestre.getUEs();
      })
      .then((UEs) => res.json(UEs))
      .catch(next);
  },

  get_ressources_of_id: (req, res, next) => {
    return db.Semestre.findByPk(req.params.semestre_id)
      .then((semestre) => {
        if (!semestre) {
          throw { status: 404, message: 'Semestre not found' };
        }
        return semestre.getRessources();
      })
      .then((ressources) => res.json(ressources))
      .catch(next);
  }

};
