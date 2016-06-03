'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_skills extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_skills';
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
      userSkill: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_user_skills',
        join: {
          from: 'tc_skills.id',
          to: 'tc_user_skills.skill_id'
        }
      },
      property: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_skill_properties',
        join: {
          from: 'tc_skills.id',
          to: 'tc_skill_properties.skill_id'
        }
      },
      require: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_skill_requires',
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

module.exports = tc_skills;
