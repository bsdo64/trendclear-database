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
      categories: {
        relation: Model.OneToManyRelation,
        modelClass: __dirname + '/tc_club_categories',
        join: {
          from: 'tc_club_category_groups.id',
          to: 'tc_club_categories.club_category_group_id'
        }
      }
    };
  }
}

module.exports = tc_club_category_groups;