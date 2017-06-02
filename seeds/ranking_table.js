const Db = require('../Models/index');
const co = require('co');
const shortId = require('shortid');

exports.seed = function(knex, Promise) {
  for (let el in Db) {
    if (Db.hasOwnProperty(el)) {
      Db[el].knex(knex);
    }
  }

  const query = [

  ];

  // Deletes ALL existing entries
  return knex('tc_search_logs').del()
    .then(() => knex('tc_search_ranks').del())
    .then(() => Promise.all(query))
};
