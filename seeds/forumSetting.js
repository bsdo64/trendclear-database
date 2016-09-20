const Db = require('../Models/index');

exports.seed = function (knex, Promise) {
  for (var el in Db) {
    Db[el].knex(knex);
  }

  return knex('tc_forum_managers').del()
    .then(function () {

      return Db
        .tc_forums
        .query()
        .then(forums => {
          const insertArray = [];

          for(let index in forums) {
            const forum = forums[index];
            insertArray.push(
              knex('tc_forum_managers').insert({forum_id: forum.id, user_id: forum.creator_id})
            )
          }

          return Promise
            .all(insertArray)
        })
    });
};
