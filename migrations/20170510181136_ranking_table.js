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
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('tc_search_logs')
    .dropTableIfExists('tc_search_ranks')
};
