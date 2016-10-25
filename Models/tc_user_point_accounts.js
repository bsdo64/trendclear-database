'use strict';
const Objection = require('objection');
const QueryBuilder = Objection.QueryBuilder;
const Model = Objection.Model;

class tc_user_point_accounts extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'tc_user_point_accounts';
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
      trade: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + '/tc_trades',
        join: {
          from: 'tc_user_point_accounts.trade_id',
          to: 'tc_trades.id'
        }
      }
    };
  }

  fullName() {
    return this.email + ' - ' + this.nick;
  }

}

module.exports = tc_user_point_accounts;
