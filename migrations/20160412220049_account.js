'use strict';

exports.up = (knex, Promise) => {
  return knex
    .schema

    /**
     * 회원 스키마
     *
     * has:
     *  - password
     *  - password_change_log
     *
     *  - role
     *  - profile
     *  - activity
     *  -
     */
    .createTable('tc_users', (table) => {
      table.increments('id').primary();
      table.string('uid').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('nick').unique().notNullable();
    })

    /**
     * 회원 - 비밀번호 스키마
     *
     */
    .createTable('tc_user_passwords', (table) => {
      table.increments('id').primary();
      table.string('password').notNullable();

      table.integer('user_id').unique().references('tc_users.id');
    })

    .createTable('tc_user_password_change_logs', (table) => {
      table.increments('id').primary();
      table.timestamp('changed_at');

      table.integer('user_id').references('tc_users.id');
      table.integer('user_password_id').references('tc_user_passwords.id');
    })

    /**
     * 회원 - 로그인 로그 스키마
     */
    .createTable('tc_user_login_logs', (table) => {
      table.increments('id').primary();
      table.string('type'); // fail, success
      table.timestamp('created_at');

      table.integer('user_id').references('tc_users.id');
    })

    /**
     * 회원 - 비밀번호 찾기 로그 스키마
     */
    .createTable('tc_user_find_password_logs', (table) => {
      table.increments('id').primary();
      table.string('type'); // fail, success
      table.timestamp('created_at');

      table.integer('user_id').references('tc_users.id');
    })

    /**
     * role 스키마
     *
     * 1 - 일반 회원
     * 2 - 트랜드 클리어 직원
     * ...
     *
     * has:
     *  - user_role
     */
    .createTable('tc_roles', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
    })

    /**
     * 회원 - role 스키마
     *
     */
    .createTable('tc_user_roles', (table) => {
      table.increments('id').primary();

      table.integer('user_id').unique().references('tc_users.id');
      table.integer('role_id').references('tc_roles.id');
    })

    /**
     * 회원 - profile 스키마
     *
     */
    .createTable('tc_user_profiles', (table) => {
      table.increments('id').primary();
      table.boolean('sex').notNullable();
      table.string('avatar_img');
      table.timestamp('birth');
      table.timestamp('joined_at');

      table.integer('user_id').unique().references('tc_users.id');
    })

    /**
     * badge 스키마
     *
     */
    .createTable('tc_badges', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('badge_img');

      table.integer('creator_id').references('tc_users.id');
    })

    /**
     * 회원 - badge 스키마
     *
     */
    .createTable('tc_user_badges', (table) => {
      table.increments('id').primary();

      table.integer('keeper_id').references('tc_users.id');
      table.integer('badge_id').references('tc_badges.id');
    })

    /**
     * icon 스키마
     *
     */
    .createTable('tc_icons', (table) => {
      table.increments('id').primary();
      table.string('icon_img');
      table.timestamp('created_at');

      table.integer('creator_id').references('tc_users.id');
    })

    /**
     * 회원 - having icon 스키마
     *
     */
    .createTable('tc_user_having_icons', (table) => {
      table.increments('id').primary();
      table.timestamp('keeping_at');

      table.integer('keeper_id').references('tc_users.id');
      table.integer('icon_id').references('tc_icons.id');
    })

    /**
     * 회원 - trendbox 스키마
     *
     */
    .createTable('tc_user_trendbox', (table) => {
      table.increments('id').primary();

      // function levelUp(N) { return 1.2 * Math.pow(N, 3) - 15 * Math.pow(N, 2) + 100 * N - 140 }
      table.integer('level').unsigned().defaultTo(1).notNullable();
      table.integer('exp').unsigned().defaultTo(0).notNullable();

      table.integer('reputation').defaultTo(0).notNullable();

      table.integer('T').unsigned().defaultTo(0).notNullable();
      table.integer('R').unsigned().defaultTo(0).notNullable();
      table.integer('E').unsigned().defaultTo(0).notNullable();

      table.integer('icon_id').references('tc_user_having_icons.id');
      table.integer('tc_user_id').unique().references('tc_users.id');
    })

    /**
     * skill 스키마
     *
     */
    .createTable('tc_skills', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('img');
    })

    /**
     * skill - property 스키마
     *
     */
    .createTable('tc_skills_properties', (table) => {
      table.increments('id').primary();
      table.string('leveling');
      table.string('cooltime');

      table.integer('skill_id').references('tc_skills.id');
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .createTable('tc_user_skills', (table) => {
      table.increments('id').primary();
      table.integer('level').defaultTo(1).notNullable();

      table.integer('skill_id').references('tc_skills.id');
      table.integer('user_id').references('tc_users.id');
    })

    /**
     * skill - 레벨 스키마
     *
     */
    .createTable('tc_user_skill_logs', (table) => {
      table.increments('id').primary();
      table.string('type'); //used, save

      table.integer('skill_id').references('tc_skills.id');
      table.integer('user_id').references('tc_users.id');
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .createTable('tc_skill_requires', (table) => {
      table.increments('id').primary();

      table.integer('level').defaultTo(1);
      table.integer('reputation').defaultTo(1);
      table.integer('T').defaultTo(1);
      table.integer('R').defaultTo(1);
      table.integer('E').defaultTo(1);
      table.integer('badge').defaultTo(1);
      table.integer('grade').defaultTo(1);

      table.integer('skill_id').references('tc_skills.id');
    })

    /**
     * grade 스키마
     *
     * 1 - 없음
     * 2 - 브론즈
     * 3 - 실버
     * 4 - 골드
     * 5 - 플레티넘
     * 6 - 다이아몬드
     */
    .createTable('tc_grades', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('img');
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .createTable('tc_grade_requires', (table) => {
      table.increments('id').primary();

      table.integer('level').defaultTo(1);
      table.integer('reputation').defaultTo(1);
      table.integer('T').defaultTo(1);
      table.integer('R').defaultTo(1);
      table.integer('E').defaultTo(1);
      table.integer('badge').defaultTo(1);

      table.integer('joined_day').defaultTo(1);

      table.integer('grade_id').references('tc_grades.id');
    })

    /**
     * 회원 - grade 스키마
     *
     */
    .createTable('tc_user_grades', (table) => {
      table.increments('id').primary();

      table.integer('grade_id').references('tc_grades.id');
      table.integer('user_id').unique().references('tc_users.id');
    })

    /**
     * reputation - definition 스키마
     *
     */
    .createTable('tc_reputation_definitions', (table) => {
      table.increments('id').primary();
      table.string('action_type'); // post, comment, like, skill, ...
      table.string('action'); // write, read, delete, report ...
      table.string('description');
      table.integer('reputation_value');
    })

    .createTable('tc_user_reputation_logs', (table) => {
      table.increments('id').primary();
      table.timestamp('created_at');
      table.string('action');

      table.integer('tc_reputation_definition_id').references('tc_reputation_definitions.id');
      table.integer('tc_user_id').references('tc_users.id');
    })

    /**
     * point - definition 스키마
     *
     */
    .createTable('tc_point_definitions', (table) => {
      table.increments('id').primary();
      table.string('point_type').notNullable(); // T, R, E
      table.string('action_type'); // action_type
      table.string('action');
      table.string('description');
      table.integer('point_value').notNullable();
    })

    .createTable('tc_user_point_logs', (table) => {
      table.increments('id').primary();
      table.timestamp('created_at');
      table.string('action');

      table.integer('tc_point_definition_id').references('tc_point_definitions.id');
      table.integer('tc_user_id').references('tc_users.id');
    })

    .createTable('tc_clubs', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('url');
      table.string('description');

      table.integer('creator_id').references('tc_users.id');
    })

    .createTable('tc_club_category_groups', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('url');
      table.string('order');
      table.string('using');
      table.string('description');

      table.integer('creator_id').unique().references('tc_users.id');
      table.integer('club_id').unique().references('tc_clubs.id');
    })

    .createTable('tc_club_categories', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('url');
      table.string('order');
      table.string('using');
      table.string('description');

      table.integer('creator_id').unique().references('tc_users.id');
      table.integer('club_category_group_id').unique().references('tc_club_category_groups.id');
    })

    .createTable('tc_forum_groups', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('url');
      table.string('order');
      table.string('using');
      table.string('description');

      table.integer('creator_id').unique().references('tc_users.id');
      table.integer('club_category_id').unique().references('tc_club_categories.id');
    })

    .createTable('tc_forums', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('url');
      table.string('order');
      table.string('using');
      table.string('description');

      table.integer('creator_id').unique().references('tc_users.id');
      table.integer('forum_group_id').unique().references('tc_forum_groups.id');
    })

    .createTable('tc_forum_settings', (table) => {
      table.increments('id').primary();
      table.boolean('is_');
      table.string('url');
      table.string('order');
      table.string('using');
      table.string('description');

      table.integer('forum_id').unique().references('tc_forums.id');
    })

    .createTable('tc_forum_prefixes', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();

      table.integer('forum_id').unique().references('tc_forums.id');
    })

    .createTable('tc_forum_prefix_permissions', (table) => {
      table.increments('id').primary();

      table.integer('role_id').references('tc_roles.id');
    })

    .createTable('tc_posts', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('content').notNullable();
      table.string('like_count').notNullable();
      table.string('comment_count').notNullable();
      table.string('view_count').notNullable();
      table.string('scrap_count').notNullable();
      table.string('deleted').notNullable();
      table.string('has_img').notNullable();
      table.string('has_video').notNullable();
      table.timestamp('created_at').notNullable();

      table.integer('author_id').unique().references('tc_users.id');
      table.integer('forum_id').unique().references('tc_forums.id');
      table.integer('prefix_id').unique().references('tc_forum_prefixes.id');
    })

    .createTable('tc_comments', (table) => {
      table.increments('id').primary();
      table.string('content').notNullable();
      table.string('like_count').notNullable();
      table.string('sub_comment_count').notNullable();
      table.string('deleted').notNullable();

      table.integer('author_id').references('tc_users.id');
      table.integer('post_id').references('tc_posts.id');
    })

    .createTable('tc_sub_comments', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('content').notNullable();
      table.string('like_count').notNullable();
      table.string('deleted').notNullable();

      table.integer('author_id').references('tc_users.id');
      table.integer('comment_id').references('tc_comments.id');
    })

    .createTable('tc_likes', (table) => {
      table.increments('id').primary();
      table.string('type').notNullable();
      table.string('type_id').notNullable();

      table.integer('liker_id').references('tc_users.id');
    })

    .createTable('tc_tags', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })

    .createTable('tc_post_tags', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();

      table.integer('post_id').references('tc_posts.id');
      table.integer('tag_id').references('tc_tags.id');
    })

    .createTable('tc_user_scraps', (table) => {
      table.increments('id').primary();
      table.string('type').notNullable(); // post, club, category
      table.string('type_id').notNullable(); // post, comment
      table.timestamp('created_at').notNullable();

      table.integer('user_id').references('tc_users.id');
    })

    .createTable('tc_user_reports', (table) => {
      table.increments('id').primary();
      table.string('type').notNullable(); // post, comment, user
      table.string('type_id').notNullable();
      table.string('description').notNullable();
      table.timestamp('created_at').notNullable();

      table.integer('reporter_id').references('tc_users.id');
    })
};

exports.down = (knex, Promise) => {
  return knex
    .schema
    .dropTable('tc_user_reports')
    .dropTable('tc_user_scraps')
    .dropTable('tc_post_tags')
    .dropTable('tc_tags')
    .dropTable('tc_likes')
    .dropTable('tc_sub_comments')
    .dropTable('tc_comments')
    .dropTable('tc_posts')
    .dropTable('tc_forum_prefix_permissions')
    .dropTable('tc_forum_prefixes')
    .dropTable('tc_forum_settings')
    .dropTable('tc_forums')
    .dropTable('tc_forum_groups')
    .dropTable('tc_club_categories')
    .dropTable('tc_club_category_groups')
    .dropTable('tc_clubs')
    .dropTable('tc_user_point_logs')
    .dropTable('tc_point_definitions')
    .dropTable('tc_user_reputation_logs')
    .dropTable('tc_reputation_definitions')
    .dropTable('tc_user_grades')
    .dropTable('tc_grade_requires')
    .dropTable('tc_grades')
    .dropTable('tc_skill_requires')
    .dropTable('tc_user_skill_logs')
    .dropTable('tc_user_skills')
    .dropTable('tc_skills_properties')
    .dropTable('tc_skills')
    .dropTable('tc_user_trendbox')
    .dropTable('tc_user_having_icons')
    .dropTable('tc_icons')
    .dropTable('tc_user_badges')
    .dropTable('tc_badges')
    .dropTable('tc_user_profiles')
    .dropTable('tc_user_roles')
    .dropTable('tc_roles')
    .dropTable('tc_user_find_password_logs')
    .dropTable('tc_user_login_logs')
    .dropTable('tc_user_password_change_logs')
    .dropTable('tc_user_passwords')
    .dropTable('tc_users')
};