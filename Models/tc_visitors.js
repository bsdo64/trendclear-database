'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_visitors extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_visitors';
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
      devices: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_visitor_devices',
        join: {
          from: 'tc_visitors.uuid',
          to: 'tc_visitor_devices.visitor_uid'
        }
      },
      pageViews: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_visitor_views',
        join: {
          from: 'tc_visitors.uuid',
          to: 'tc_visitor_views.visitor_uid'
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_users',
        join: {
          from: 'tc_visitors.user_id',
          to: 'tc_users.id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_visitors;
