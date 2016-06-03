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
      type: 'object'
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      skill: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_skills',
        join: {
          from: 'tc_skills.id',
          to: 'tc_skill_requires.skill_id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_users;
