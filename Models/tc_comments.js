'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_comments extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_comments';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_users',
        filter: query => query.select('tc_users.id', 'uid', 'nick'),
        join: {
          from: 'tc_comments.author_id',
          to: 'tc_users.id'
        }
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_posts',
        join: {
          from: 'tc_comments.post_id',
          to: 'tc_posts.id'
        }
      },
      subComments: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_sub_comments',
        join: {
          from: 'tc_comments.id',
          to: 'tc_sub_comments.comment_id'
        }
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_likes',
        filter: {type: 'comment'},
        join: {
          from: 'tc_comments.id',
          to: 'tc_likes.type_id'
        }
      }
    };
  }
}

module.exports = tc_comments;
