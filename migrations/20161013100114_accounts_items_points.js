
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('tc_trades', function (table) {
      table.increments('id').primary();

      table.string('type'); //item, charge_rp

      table.string('sender_type'); //venacle, user, event...
      table.integer('sender_id'); //user_id, event_id

      table.string('target_type'); //write post, write comment, item purchase
      table.integer('target_id'); //post, comment, item, ...

      table.string('receiver_type'); //venacle, user...
      table.integer('receiver_id'); //user_id

      table.integer('amount_t');
      table.integer('amount_r');

      table.timestamp('created_at');
    })
    .createTable('tc_user_point_accounts', function (table) {
      table.increments('id').primary();

      table.string('type'); //deposit, withdraw
      table.string('point_type'); // TP, RP

      table.integer('total_t'); // amount + before total
      table.integer('total_r'); // amount + before total

      table.integer('trade_id').references('tc_trades.id');
      table.integer('user_id').references('tc_users.id');
      table.timestamp('created_at');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('tc_user_point_accounts')
    .dropTableIfExists('tc_trades')
    .table('tc_forums', function (table) {
      table.dropColumn('follow_count');
      table.dropColumn('subs_count');
      table.dropColumn('post_count');

      table.dropUnique('title');
    })
    .table('tc_posts', function (table) {
      table.dropColumn('width');
      table.dropColumn('height');
      table.dropColumn('link_id');
    })
};
