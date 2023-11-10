'use strict';

const ue_ctrl = require('../controllers/ue');

module.exports = [

  {
    url: '/semestre/:semestre_id/ue',
    method: 'post',
    func: ue_ctrl.create
  },
  {
    url: '/semestre/:semestre_id/ue/:ue_id',
    method: 'get',
    func: ue_ctrl.get_by_id
  },
  {
    url: '/semestre/:semestre_id/ue/:ue_id',
    method: 'put',
    func: ue_ctrl.update_by_id
  },
  {
    url: '/semestre/:semestre_id/ue/:ue_id',
    method: 'delete',
    func: ue_ctrl.delete_by_id
  }

];
