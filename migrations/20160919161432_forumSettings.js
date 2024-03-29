
exports.up = function(knex, Promise) {
  return knex.schema
  // 기존 테이블 변경 (삭제)
    .createTable('tc_forum_ban_users', function (table) {
      table.increments('id').primary();

      table.integer('forum_id').references('tc_forums.id');
      table.integer('user_id').references('tc_users.id');
      table.timestamp('created_at');
    })
    .createTable('tc_forum_managers', function (table) {
      table.increments('id').primary();

      table.integer('forum_id').references('tc_forums.id');
      table.integer('user_id').references('tc_users.id');
    })
    .createTable('tc_forum_announce_posts', function (table) {
      table.increments('id').primary();

      table.integer('forum_id').references('tc_forums.id');
      table.integer('post_id').references('tc_posts.id');
    })
    .table('tc_forums', function (table) {
      //table.dropColumn('name');
      table.integer('follow_count').unsigned().defaultTo(0);
      table.integer('subs_count').unsigned().defaultTo(0);
      table.integer('post_count').unsigned().defaultTo(0);
    })
    .alterTable('tc_forums', function (table) {
      table.unique('title');
    })
    .table('tc_posts', function (table) {
      table.integer('width').unsigned().defaultTo(0);
      table.integer('height').unsigned().defaultTo(0);
      table.string('link_id');
    })
    .createTableIfNotExists('tc_post_images', function (table) {
      table.increments('id').primary();

      table.text('url');
      table.text('name');
      table.integer('width').unsigned().defaultTo(0);
      table.integer('height').unsigned().defaultTo(0);

      table.integer('post_id').references('tc_posts.id');
    })
    .createTableIfNotExists('tc_post_videos', function (table) {
      table.increments('id').primary();

      table.text('url');
      table.string('type');
      table.text('img_src');
      table.integer('width').unsigned().defaultTo(0);
      table.integer('height').unsigned().defaultTo(0);

      table.integer('post_id').references('tc_posts.id');
    })
    .createTable('tc_visitors', function (table) {
      table.increments('id').primary();

      table.string('uuid').unique();
      table.integer('user_id').references('tc_users.id');
    })
    .createTable('tc_visitor_devices', function (table) {
      table.increments('id').primary();
      table.text('session_id');
      table.string('ip');

      table.text('os');
      table.text('browser');

      table.timestamp('last_visit');
      table.timestamp('first_visit');

      table.string('visitor_uid').references('tc_visitors.uuid');
    })
    .createTable('tc_link_click_logs', function (table) {
      table.increments('id').primary();
      table.string('link_id');

      table.text('before_url');
      table.text('target_url');

      table.string('type');
      table.integer('type_id');

      table.string('visitor_uid').references('tc_visitors.uuid');
      table.integer('user_id').references('tc_users.id');

      table.timestamp('clicked_at');
    })
    .createTable('tc_visitor_views', function (table) {
      table.string('type');
      table.text('url');
      table.string('visitor_uid').references('tc_visitors.uuid');
      table.timestamp('created_at');
    })
    .createTable('tc_site_values', function (table) {
      table.increments('id').primary();
      table.string('key');
      table.text('value');
      table.string('type');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('tc_post_views', function (table) {
      table.dropColumn('visitor_uid');
      table.string('user_id');
      table.string('ip');
    })
    .dropTableIfExists('tc_site_values')
    .dropTableIfExists('tc_forum_ban_users')
    .dropTableIfExists('tc_forum_managers')
    .dropTableIfExists('tc_forum_announce_posts')
    .dropTableIfExists('tc_post_images')
    .dropTableIfExists('tc_post_videos')
    .dropTableIfExists('tc_link_click_logs')
    .dropTableIfExists('tc_visitor_views')
    .dropTableIfExists('tc_visitor_devices')
    .dropTableIfExists('tc_visitors')
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
