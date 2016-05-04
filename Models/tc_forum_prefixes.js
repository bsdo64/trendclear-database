'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_forum_prefixes extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_forum_prefixes';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name']
    };
  }
  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_posts',
        join: {
          from: 'tc_forum_prefixes.id',
          to: 'tc_posts.prefix_id'
        }
      }
    };
  }

}

module.exports = tc_forum_prefixes;
