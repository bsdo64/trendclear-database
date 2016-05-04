'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_user_having_icons extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_user_having_icons';
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
      iconDef: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_icons',
        join: {
          from: 'tc_user_having_icons.icon_id',
          to: 'tc_icons.id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_user_having_icons;
