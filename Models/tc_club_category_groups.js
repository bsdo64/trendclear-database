'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_club_category_groups extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_club_category_groups';
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
      posts: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_posts',
        join: {
          from: 'tc_club_category_groups.id',
          to: 'tc_posts.category_group_id'
        }
      },
      categories: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_club_categories',
        join: {
          from: 'tc_club_category_groups.id',
          to: 'tc_club_categories.club_category_group_id'
        }
      },
      club: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_clubs',
        join: {
          from: 'tc_club_category_groups.club_id',
          to: 'tc_clubs.id'
        }
      }
    };
  }
}

module.exports = tc_club_category_groups;
