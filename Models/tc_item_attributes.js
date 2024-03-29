'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_item_attributes extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_item_attributes';
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
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_items',
        join: {
          from: 'tc_item_attributes.item_id',
          to: 'tc_items.id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_item_attributes;
