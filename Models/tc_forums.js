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
        relation: Model.OneToManyRelation,
        modelClass: __dirname + '/tc_forum_prefixes',
        join: {
          from: 'tc_forums.id',
          to: 'tc_forum_prefixes.forum_id'
        }
      }
    };
  }

}

module.exports = tc_forums;
