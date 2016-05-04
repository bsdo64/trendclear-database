'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_user_passwords extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_user_passwords';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['password']
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_users',
        join: {
          from: 'tc_user_passwords.user_id',
          to: 'tc_users.id'
        }
      }
    }
  }
}

module.exports = tc_user_passwords;
