'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_user_skill_logs extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_user_skill_logs';
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
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_users',
        filter: query => query.select('id', 'uid', 'nick'),
        join: {
          from: 'tc_user_skill_logs.user_id',
          to: 'tc_users.id'
        }
      },
      skill: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_user_skills',
        join: {
          from: 'tc_user_skill_logs.skill_id',
          to: 'tc_user_skills.id'
        }
      },
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_user_skill_logs;
