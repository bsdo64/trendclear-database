
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('tc_items', function (table) {
      table.increments('id').primary();

      table.string('code');
      table.string('title');

      table.string('image');
    })
    .createTable('tc_item_attributes', function (table) {
      table.increments('id').primary();

      table.string('inventory_type'); //post,
      table.string('item_type'); //post,
      table.string('purpose'); //post,
      table.string('description'); //item purchase, charge_rp, service(write post, write comment...)

      table.integer('available_level');
      table.integer('cooltime_sec');
      table.string('price_type'); // r, t, both
      table.integer('price_t');
      table.integer('price_r');

      table.timestamp('created_at');
      table.integer('creator_id').references('tc_users.id');
      table.integer('item_id').references('tc_items.id');
    })
    .createTable('tc_item_categories', function (table) {
      table.increments('id').primary();

      table.string('category1');
      table.string('category2');
      table.string('category3');
      table.string('category4');

      table.integer('item_id').references('tc_items.id');
      table.integer('creator_id').references('tc_users.id');
      table.timestamp('created_at');
    })
    .createTable('tc_trades', function (table) {
      table.increments('id').primary();

      table.string('action'); //item purchase, charge_rp, service(write post, write comment...)

      table.string('sender_type'); //venacle, user, event...
      table.integer('sender_id'); //user_id, event_id

      table.string('target_type'); //post, comment, purchase
      table.integer('target_id'); //post, comment, item, ...
      table.integer('target_count');

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

      table.index('created_at', 'DESC');
    })
    .createTable('tc_user_item_orders', function (table) {
      table.increments('id').primary();

      table.integer('trade_id').references('tc_trades.id');
      table.integer('account_id').references('tc_user_point_accounts.id');
    })
    .createTable('tc_user_inventories', function (table) {
      table.increments('id').primary();

      table.string('type'); // community, badge ...

      table.integer('max_item_count');
      table.integer('max_inventory_box');
      table.integer('user_id').references('tc_users.id');
    })
    .createTable('tc_user_inventory_items', function (table) {
      table.increments('id').primary();

      table.integer('item_count');

      table.integer('item_id').references('tc_items.id');
      table.integer('inventory_id').references('tc_user_inventories.id');
    })
    .createTable('tc_user_inventory_logs', function (table) {
      table.increments('id').primary();

      table.string('log_uid');
      table.string('usage'); //puchase, event, used

      table.string('target_type'); //post
      table.integer('target_id'); //post_id

      table.integer('item_count');
      table.integer('total_item_count');

      table.integer('inventory_item_id').references('tc_user_inventory_items.id');
    })
    .createTable('tc_venalinks', function (table) {
      table.increments('id').primary();

      table.boolean('is_activate');
      table.integer('total_amount_r');
      table.integer('pay_per_click_r');
      table.integer('total_pay_r');
      table.integer('total_remain_r');

      table.integer('post_id').references('tc_posts.id');
      table.integer('activate_item_id').references('tc_user_inventory_logs.id');

      table.timestamp('active_at');
      table.timestamp('terminate_at');
    })
    .createTable('tc_user_has_venalinks', function (table) {
      table.increments('id').primary();

      table.integer('venalink_id').references('tc_venalinks.id');
      table.string('venalink_uid');

      table.integer('used_venalink_item_id').references('tc_user_inventory_logs.id');
      table.integer('user_id').references('tc_users.id');

      table.timestamp('request_at');
    })
    .createTable('tc_venalink_click_logs', function (table) {
      table.increments('id').primary();

      table.text('before_url');
      table.text('target_url');

      table.string('type');
      table.integer('type_id');

      table.string('visitor_uid').references('tc_visitors.uuid');
      table.integer('user_id').references('tc_users.id');
      table.integer('user_venalink_id').references('tc_user_has_venalinks.id');

      table.timestamp('clicked_at');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('tc_venalink_click_logs')
    .dropTableIfExists('tc_user_has_venalinks')
    .dropTableIfExists('tc_venalinks')
    .dropTableIfExists('tc_user_inventory_logs')
    .dropTableIfExists('tc_user_inventory_items')
    .dropTableIfExists('tc_user_inventories')
    .dropTableIfExists('tc_user_item_orders')
    .dropTableIfExists('tc_user_point_accounts')
    .dropTableIfExists('tc_trades')
    .dropTableIfExists('tc_item_categories')
    .dropTableIfExists('tc_item_attributes')
    .dropTableIfExists('tc_items')
};
