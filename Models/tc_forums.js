'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_forums extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_forums';
  }
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'order', 'description', 'using']
    };
  }
  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      prefixes: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_forum_prefixes',
        join: {
          from: 'tc_forums.id',
          to: 'tc_forum_prefixes.forum_id'
        }
       },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_club_categories',
        join: {
          from: 'tc_forums.category_id',
          to: 'tc_club_categories.id'
        }
      },
    };
  }

}

module.exports = tc_forums;
