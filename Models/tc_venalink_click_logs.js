'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_venalink_click_logs extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_venalink_click_logs';
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
      visitor: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_visitors',
        join: {
          from: 'tc_venalink_click_logs.visitor_uid',
          to: 'tc_visitors.uuid'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }
}

module.exports = tc_venalink_click_logs;
