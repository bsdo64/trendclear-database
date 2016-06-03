'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_user_skills extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_user_skills';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object'
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      skill: {
        // filter: query => query.select('id', 'ownerId', 'name'), //Select colums
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_skills',
        join: {
          from: 'tc_user_skills.skill_id',
          to: 'tc_skills.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_users',
        join: {
          from: 'tc_user_skills.user_id',
          to: 'tc_users.id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_user_skills;
