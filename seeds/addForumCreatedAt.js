const Db = require('../Models/index');

exports.seed = function (knex, Promise) {
  for (var el in Db) {
    Db[el].knex(knex);
  }

  return Db
    .tc_forums
    .query()
    .patch({created_at: new Date()})
};
