'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_venalinks extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_venalinks';
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
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_posts',
        join: {
          from: 'tc_venalinks.post_id',
          to: 'tc_posts.id'
        }
      },
      activate_item_log: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_posts',
        join: {
          from: 'tc_venalinks.activate_item_id',
          to: 'tc_user_inventory_logs.id'
        }
      },
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }
}

module.exports = tc_venalinks;
