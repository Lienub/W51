'use strict';

const semestre_ctrl = require('../controllers/semestre');

module.exports = [

  {
    url: '/semestre',
    method: 'get',
    func: semestre_ctrl.get_all
  },
  {
    url: '/semestre',
    method: 'post',
    func: semestre_ctrl.create
  },
  {
    url: '/semestre/:semestre_id',
    method: 'get',
    func: semestre_ctrl.get_by_id
  },
  {
    url: '/semestre/:semestre_id',
    method: 'put',
    func: semestre_ctrl.update_by_id
  },
  {
    url: '/semestre/:semestre_id',
    method: 'delete',
    func: semestre_ctrl.delete_by_id
  },
  {
    url: '/semestre/:semestre_id/ue',
    method: 'get',
    func: semestre_ctrl.get_UEs_of_id
  },
  {
    url: '/semestre/:semestre_id/ressource',
    method: 'get',
    func: semestre_ctrl.get_ressources_of_id
  },

];
