'use_strict';

const
  db = require('../models');

module.exports = {

  get_by_id: (req, res, next) => {
    return db.UE.findByPk(req.params.ue_id)
      .then((UE) => {
        if (!UE) {
          throw { status: 404, message: 'UE not found' };
        }
        return res.json(UE);
      })
      .catch(next);
  },

  create: (req, res, next) => {
    return db.Semestre.findByPk(req.params.semestre_id)
      .then((semestre) => {
        if (!semestre) {
          throw { status: 404, message: 'Semestre not found' };
        }
        return semestre.createUE(req.body);
      })
      .then((UE) => res.json(UE))
      .catch(next);
  },

  update_by_id: (req, res, next) => {
    return db.UE.findByPk(req.params.ue_id)
      .then((UE) => {
        if (!UE) {
          throw { status: 404, message: 'UE not found' };
        }
        Object.assign(UE, req.body);
        return UE.save();
      })
      .then((UE) => res.json(UE))
      .catch(next);
  },

  delete_by_id: (req, res, next) => {
    return db.UE.findByPk(req.params.ue_id)
      .then((UE) => {
        if (!UE) {
          throw { status: 404, message: 'UE not found' };
        }
        return UE.destroy();
      })
      .then(() => res.status(200).end())
      .catch(next);
  }

};
