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

module.Models = require('./Models/index');