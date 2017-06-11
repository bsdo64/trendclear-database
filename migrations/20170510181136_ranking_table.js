exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('tc_search_logs', function (table) {
      table.increments('id').primary();
      table.string('query');
      table.timestamp('query_at');
      table.integer('visitor_id');
    })
    .createTable('tc_search_ranks', function (table) {
      table.increments('id').primary();
      table.string('query').unique();
      table.integer('query_count').defaultTo(0);
    })
    .createTable('tc_latest_seen', function (table) {
      table.increments('id').primary();
      table.integer('post_id');
      table.integer('user_id');
      table.timestamp('created_at');
    })
    .table('tc_forums', function (table) {
      table.string('forum_image');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('tc_search_logs')
    .dropTableIfExists('tc_search_ranks')
    .dropTableIfExists('tc_latest_seen')
    .hasColumn('tc_forums', 'forum_image')
    .then(result => {

      if (result[result.length - 1]) {
        return knex.schema.table('tc_forums', function (table) {
          table.dropColumn('forum_image');
        })
      }
    })
};
