'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_roles extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_roles';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name']
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {};
  }

}

module.exports = tc_roles;
