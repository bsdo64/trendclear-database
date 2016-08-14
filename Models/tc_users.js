'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_users extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_users';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['email', 'nick', 'uid'],
      properties: {
        email: {type: 'string'},
        nick: {type: 'string'},
        uid: {type: 'string'}
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      password: {
        // filter: query => query.select('id', 'ownerId', 'name'), //Select colums
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_user_passwords',
        join: {
          from: 'tc_user_passwords.user_id',
          to: 'tc_users.id'
        }
      },
      // login_logs:{},
      // password_find_logs:{},
      // password_change_logs:{},
      role: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_user_roles',
        join: {
          from: 'tc_users.id',
          to: 'tc_user_roles.user_id'
        }
      },
      profile: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_user_profiles',
        join: {
          from: 'tc_users.id',
          to: 'tc_user_profiles.user_id'
        }
      },

      // badges: {},
      icon: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_user_having_icons',
        join: {
          from: 'tc_users.id',
          to: 'tc_user_having_icons.keeper_id'
        }
      },
      trendbox: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_user_trendboxes',
        join: {
          from: 'tc_users.id',
          to: 'tc_user_trendboxes.user_id'
        }
      },
      skills: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_user_skills',
        join: {
          from: 'tc_users.id',
          to: 'tc_user_skills.user_id'
        }
      },
      skill_logs: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_user_skill_logs',
        join: {
          from: 'tc_users.id',
          to: 'tc_user_skill_logs.user_id'
        }
      },
      grade: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_user_grades',
        join: {
          from: 'tc_users.id',
          to: 'tc_user_grades.user_id'
        }
      },
      // reputation_logs: {},
      // point_logs: {},
      // exp_logs: {},
      posts: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_posts',
        join: {
          from: 'tc_users.id',
          to: 'tc_posts.author_id'
        }
      },
      // comments: {},
      // sub_comments:{},
      // likes: {},
      // scraps: {},
      // reports: {},

      notifications: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_user_notifications',
        join: {
          from: 'tc_users.id',
          to: 'tc_user_notifications.user_id'
        }
      },

      collections: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_collections',
        join: {
          from: 'tc_users.id',
          to: 'tc_collections.creator'
        }
      },
      follow_forums: {
        relation: Model.ManyToManyRelation,
          modelClass: __dirname + '/tc_forums',
          join: {
          from: 'tc_users.id',
            // ManyToMany relation needs the `through` object
            // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            modelClass: __dirname + '/tc_user_follow_forums',
              from: 'tc_user_follow_forums.user_id',
              to: 'tc_user_follow_forums.forum_id'
          },
          to: 'tc_forums.id'
        }
      },
    };
  }

}

module.exports = tc_users;
