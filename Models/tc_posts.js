'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_posts extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_posts';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'content']
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/tc_tags',
        join: {
          from: 'tc_posts.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            modelClass: __dirname + '/tc_post_has_tags',
            from: 'tc_post_has_tags.post_id',
            to: 'tc_post_has_tags.tag_id'
          },
          to: 'tc_tags.id'
        }
      },
      prefix: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_forum_prefixes',
        join: {
          from: 'tc_posts.prefix_id',
          to: 'tc_forum_prefixes.id'
        }
      },
      forum: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_forums',
        join: {
          from: 'tc_posts.forum_id',
          to: 'tc_forums.id'
        }
      },
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_users',
        join: {
          from: 'tc_posts.author_id',
          to: 'tc_users.id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_posts;
