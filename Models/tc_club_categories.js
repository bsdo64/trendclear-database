'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_club_categories extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_club_categories';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'order', 'description', 'using']
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      forums: {
        relation: Model.OneToManyRelation,
        modelClass: __dirname + '/tc_forums',
        join: {
          from: 'tc_club_categories.id',
          to: 'tc_forums.category_id'
        }
      }
    };
  }

}

module.exports = tc_club_categories;