'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_user_trendboxes extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_user_trendboxes';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        level: { type: 'integer' },
        exp: { type: 'integer' },
        reputation: { type: 'integer' },
        T: { type: 'integer' },
        R: { type: 'integer' },
        user_id: { type: 'integer' }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {};
  }

}

module.exports = tc_user_trendboxes;
