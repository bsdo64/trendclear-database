'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_categories extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_categories';
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
      forums: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/tc_forums',
        join: {
          from: 'tc_categories.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            modelClass: __dirname + '/tc_forum_categories',
            from: 'tc_forum_categories.category_id',
            to: 'tc_forum_categories.forum_id'
          },
          to: 'tc_forums.id'
        }
      },
    };
  }

}

module.exports = tc_categories;
