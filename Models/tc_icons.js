'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_icons extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_icons';
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
      hasIcon: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_user_having_icons',
        join: {
          from: 'tc_icons.id',
          to: 'tc_user_having_icons.icon_id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_icons;
