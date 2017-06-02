'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_latest_seen extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_latest_seen';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
    }
  };
}

module.exports = tc_latest_seen;
