
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
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('tc_forum_ban_users')
    .dropTableIfExists('tc_forum_managers')
    .dropTableIfExists('tc_forum_announce_posts')
};
