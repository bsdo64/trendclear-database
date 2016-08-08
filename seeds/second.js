const _ = require('lodash');
const M = require('../Models/index');

exports.seed = function(knex, Promise) {
  for (var el in M) {
    M[el].knex(knex);
  }

  return knex('tc_collections').del()
    .then(function () {
      return M
        .tc_users
        .query()
        .where({email: 'bsdo@naver.com'})
        .first()
    })
    .then((admin) => {
      return M
        .tc_forums
        .query()
        .patch({creator: admin.id})
    })
};
