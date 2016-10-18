'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_items extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_items';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        code: {type: 'string'},
        title: {type: 'string'},
        image: {type: 'string'},

      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      attribute: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_item_attributes',
        join: {
          from: 'tc_items.id',
          to: 'tc_item_attributes.item_id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_items;
