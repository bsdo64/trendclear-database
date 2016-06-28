'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_clubs extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_clubs';
  }

  // Optional JSON schema. This is not the database schema! This is only used for validation.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'order', 'description', 'using']
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_posts',
        join: {
          from: 'tc_clubs.id',
          to: 'tc_posts.club_id'
        }
      },
      category_groups: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_club_category_groups',
        join: {
          from: 'tc_clubs.id',
          to: 'tc_club_category_groups.club_id'
        }
      },
      categories: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_club_categories',
        join: {
          from: 'tc_clubs.id',
          to: 'tc_club_categories.club_id'
        }
      },
      forums: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_forums',
        join: {
          from: 'tc_clubs.id',
          to: 'tc_forums.club_id'
        }
      }
    };
  }

}

module.exports = tc_clubs;
