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
      // skills: {},
      // skill_logs: {},
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
      }
      // comments: {},
      // sub_comments:{},
      // likes: {},
      // scraps: {},
      // reports: {},
    };
  }

}

module.exports = tc_users;
