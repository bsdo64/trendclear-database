'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_sub_comments extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_sub_comments';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['content']
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_users',
        join: {
          from: 'tc_sub_comments.author_id',
          to: 'tc_users.id'
        }
      },
      comment: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_comments',
        join: {
          from: 'tc_sub_comments.comment_id',
          to: 'tc_comments.id'
        }
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_likes',
        filter: {type: 'sub_comment'},
        join: {
          from: 'tc_sub_comments.id',
          to: 'tc_likes.type_id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_sub_comments;
