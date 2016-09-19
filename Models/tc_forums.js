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
      bans: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/tc_users',
        join: {
          from: 'tc_forums.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            modelClass: __dirname + '/tc_forum_ban_users',
            from: 'tc_forum_ban_users.forum_id',
            to: 'tc_forum_ban_users.user_id'
          },
          to: 'tc_users.id'
        }
      },
      managers: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/tc_users',
        join: {
          from: 'tc_forums.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            modelClass: __dirname + '/tc_forum_managers',
            from: 'tc_forum_managers.forum_id',
            to: 'tc_forum_managers.user_id'
          },
          to: 'tc_users.id'
        }
      },
      announces: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/tc_posts',
        join: {
          from: 'tc_forums.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            modelClass: __dirname + '/tc_forum_announce_posts',
            from: 'tc_forum_announce_posts.forum_id',
            to: 'tc_forum_announce_posts.post_id'
          },
          to: 'tc_posts.id'
        }
      },
      prefixes: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_forum_prefixes',
        join: {
          from: 'tc_forums.id',
          to: 'tc_forum_prefixes.forum_id'
        }
       },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_users',
        join: {
          from: 'tc_forums.creator_id',
          to: 'tc_users.id'
        }
      },
      posts: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_posts',
        join: {
          from: 'tc_forums.id',
          to: 'tc_posts.forum_id'
        }
      },
    };
  }

}

module.exports = tc_forums;
