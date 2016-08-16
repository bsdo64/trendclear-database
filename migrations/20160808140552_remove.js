
exports.up = function(knex, Promise) {
  return knex.schema
    // 기존 테이블 변경 (삭제)
    .table('tc_posts', function (table) {
      knex.raw(`ALTER TABLE public.tc_posts DROP CONSTRAINT tc_posts_club_id_foreign`);
      knex.raw(`ALTER TABLE public.tc_posts DROP CONSTRAINT tc_posts_category_group_id_foreign`);
      knex.raw(`ALTER TABLE public.tc_posts DROP CONSTRAINT tc_posts_category_id_foreign`);

      table.dropColumn('club_id');
      table.dropColumn('category_group_id');
      table.dropColumn('category_id');
    })

    .table('tc_forums', function (table) {
      knex.raw(`ALTER TABLE public.tc_forums DROP CONSTRAINT tc_forums_club_id_foreign`);
      knex.raw(`ALTER TABLE public.tc_forums DROP CONSTRAINT tc_forums_category_group_id_foreign`);
      knex.raw(`ALTER TABLE public.tc_forums DROP CONSTRAINT tc_forums_category_id_foreign`);

      table.dropColumn('club_id');
      table.dropColumn('club_category_group_id');
      table.dropColumn('category_id');
      table.dropColumn('using');
    })
    .table('tc_forums', function (table) {
      table.integer('creator').references('tc_users.id');
      table.boolean('using').defaultTo(1);
    })
    .table('tc_club_categories', function (table) {
      knex.raw(`ALTER TABLE public.tc_club_categories DROP CONSTRAINT tc_club_categories_club_category_group_id_foreign`);
      knex.raw(`ALTER TABLE public.tc_club_categories DROP CONSTRAINT tc_club_categories_club_id_foreign`);
    })
    .dropTable('tc_club_categories')

    .table('tc_club_category_groups', function (table) {
      knex.raw(`ALTER TABLE public.tc_club_category_groups DROP CONSTRAINT tc_club_category_groups_club_id_foreign`);
    })
    .dropTable('tc_club_category_groups')

    .dropTable('tc_clubs')

    // 게시판 팔로잉 구성
    .createTable('tc_user_follow_forums', (table) => {
      table.increments('id').primary();

      table.integer('forum_id').references('tc_forums.id');
      table.integer('user_id').references('tc_users.id');
    })

    // 게시판 콜렉션 구성
    .createTable('tc_collections', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.boolean('isPrivate');

      table.integer('creator_id').references('tc_users.id');
      table.integer('parent_id').unsigned().references('id').inTable('tc_collections');
    })
    .createTable('tc_collection_forums', (table) => {
      table.increments('id').primary();

      table.integer('forum_id').references('tc_forums.id');
      table.integer('collection_id').references('tc_collections.id');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    // 기존 테이블 변경 (추가)
    .createTable('tc_clubs', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.integer('order');
      table.boolean('using');
      table.string('description');
    })

    .createTable('tc_club_category_groups', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('order');
      table.string('using');
      table.string('description');

      table.integer('club_id').references('tc_clubs.id');
    })

    .createTable('tc_club_categories', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('order');
      table.string('using');
      table.string('description');

      table.integer('club_id').references('tc_clubs.id');
      table.integer('club_category_group_id').references('tc_club_category_groups.id');
    })
    .table('tc_forums', function (table) {
      table.integer('club_id').references('tc_clubs.id');
      table.integer('club_category_group_id').references('tc_club_category_groups.id');
      table.integer('category_id').references('tc_club_categories.id');

      knex.raw(`ALTER TABLE public.tc_forums DROP CONSTRAINT tc_forums_creator_foreign`);
      table.dropColumn('creator');
    })
    .table('tc_posts', function (table) {
      table.integer('club_id').references('tc_clubs.id');
      table.integer('category_group_id').references('tc_club_category_groups.id');
      table.integer('category_id').references('tc_club_categories.id');
    })

    // 게시판 팔로잉 삭제
    .dropTable('tc_user_follow_forums')

    // 게시판 콜렉션 삭제
    .dropTable('tc_collection_forums')
    .dropTable('tc_collections')
};
