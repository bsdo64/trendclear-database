'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_grade_requires extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_grade_requires';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['email', 'nick', 'uid']
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {};
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_grade_requires;
