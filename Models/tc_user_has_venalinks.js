'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_user_has_venalinks extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_user_has_venalinks';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object'
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_users',
        filter: query => query.select('tc_users.id', 'uid', 'nick'),
        join: {
          from: 'tc_user_has_venalinks.user_id',
          to: 'tc_users.id'
        }
      },
      venalink: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_venalinks',
        join: {
          from: 'tc_user_has_venalinks.venalink_id',
          to: 'tc_venalinks.id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }
}

module.exports = tc_user_has_venalinks;
