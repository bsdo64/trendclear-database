const Db = require('../Models/index');
const co = require('co');

exports.seed = function(knex, Promise) {
  for (let el in Db) {
    if (Db.hasOwnProperty(el)) {
      Db[el].knex(knex);
    }
  }

  const query1 = Db.tc_search_logs.query().insert({
    query: 'Hello',
    query_at: new Date(),
    visitor_id: 76
  });
  const query2 = Db.tc_search_ranks
    .query()
    .where({query: 'Hello'})
    .first()
    .then(r => {
      console.log(r);

      if (!r) {
        return Db.tc_search_ranks
          .query()
          .insert({ query: 'Hello' })
      }

      if (r) {

        return Db.tc_search_ranks
          .query()
          .patch({ query_count: parseInt(r.query_count) + 1 })
          .where('id', r.id)
      }
    });

  // Deletes ALL existing entries
  return knex('tc_search_logs').del()
    .then(() => knex('tc_search_ranks').del())
    .then(() => query1)
    .then(() => query2)
    .then(() => query1)
    .then(() => query2)
    .then(() => query1)
    .then(() => query2)
};
