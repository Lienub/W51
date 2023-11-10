'use strict';

const ressource_ctrl = require('../controllers/ressource');

module.exports = [

  {
    url: '/semestre/:semestre_id/ressource',
    method: 'post',
    func: ressource_ctrl.create
  },
  {
    url: '/semestre/:semestre_id/ressource/:ressource_id',
    method: 'get',
    func: ressource_ctrl.get_by_id
  },
  {
    url: '/semestre/:semestre_id/ressource/:ressource_id',
    method: 'put',
    func: ressource_ctrl.update_by_id
  },
  {
    url: '/semestre/:semestre_id/ressource/:ressource_id',
    method: 'delete',
    func: ressource_ctrl.delete_by_id
  },
  {
    url: '/semestre/:semestre_id/ressource/:ressource_id/coefficient',
    method: 'post',
    func: ressource_ctrl.set_coefficient
  }

];
