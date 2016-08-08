'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_collections extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_collections';
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
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_users',
        join: {
          from: 'tc_collections.creator',
          to: 'tc_users.id'
        }
      },

      children: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tc_collections',
        join: {
          from: 'tc_collections.id',
          to: 'tc_collections.parent_id'
        }
      },

      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tc_collections',
        join: {
          from: 'tc_collections.parent_id',
          to: 'tc_collections.id'
        }
      },

      forums: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/tc_forums',
        join: {
          from: 'tc_collections.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            modelClass: __dirname + '/tc_collection_forums',
            from: 'tc_collection_forums.collection_id',
            to: 'tc_collection_forums.forum_id'
          },
          to: 'tc_forums.id'
        }
      },
    };
  }

}

module.exports = tc_collections;
