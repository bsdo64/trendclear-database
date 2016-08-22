const _ = require('lodash');
const Db = require('../../Models/index');

exports.seed = function(knex, Promise) {
  for (var el in Db) {
    Db[el].knex(knex);
  }

  return knex('tc_collections').del()
    .then(function () {
      return Db
        .tc_users
        .query()
        .where({email: 'bsdo@naver.com'})
        .first()
    })
    .then((admin) => {
      return Db
        .tc_forums
        .query()
        .patch({creator_id: admin.id})
    })
    .then(() => {
     return Db
       .tc_forums
       .query()
       .patch({using: true})
    })
};
