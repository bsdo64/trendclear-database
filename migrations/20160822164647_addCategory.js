
exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('tc_categories', (table) => {
      table.increments('id').primary();

      table.string('title').notNullable();
      table.string('type').notNullable().defaultTo('default');
      table.integer('order');
    })
    .createTable('tc_forum_categories', (table) => {
      table.increments('id').primary();

      table.integer('forum_id').references('tc_forums.id');
      table.integer('category_id').references('tc_categories.id');
    })
};

exports.down = function(knex, Promise) {
  knex
    .schema
    .dropTable('tc_categories')
    .dropTable('tc_forum_categories')
};
