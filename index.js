'use strict';
const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const connection = require('./knexfile')[env];

// Initialize knex connection.
const knex = Knex(connection);

// Give the connection to objection.
Model.knex(knex);

var M = require('./Models/index');

M
  .tc_users
  .query()
  .insert({email: 'Jenndif1er1', nick: 'hel2lo2', uid: 'hㄴsdsd33fello'})
  .then(function (jennifer) {
    console.log(jennifer instanceof M.tc_users); // --> true
    console.log(jennifer.email); // --> 'Jennifer'
    console.log(jennifer.fullName()); // --> 'Jennifer Lawrence'
  })
  .catch(function (err) {
    console.error(err);
  });