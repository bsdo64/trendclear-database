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
     *  - rolex
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
      table.string('ip'); 
      table.string('session_id'); 
      table.string('token'); 
      table.timestamp('login_at');

      table.integer('user_id').references('tc_users.id');
    })

    /**
     * 회원 - 비밀번호 찾기 로그 스키마
     */
    .createTable('tc_user_password_find_logs', (table) => {
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

      table.integer('user_id').references('tc_users.id');
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
      table.string('description_info');
      table.string('description_require');
      table.string('badge_img');

      table.integer('creator_id').references('tc_users.id');
    })

    /**
     * 회원 - badge 스키마
     *
     */
    .createTable('tc_user_badges', (table) => {
      table.increments('id').primary();
      table.timestamp('collected_at');

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
      table.string('type');   // default, created
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
    .createTable('tc_user_trendboxes', (table) => {
      table.increments('id').primary();

      // function levelUp(N) { return 1.2 * Math.pow(N, 3) - 15 * Math.pow(N, 2) + 100 * N - 140 }
      table.integer('level').unsigned().defaultTo(1).notNullable();
      table.integer('exp').unsigned().defaultTo(0).notNullable();
      table.integer('next_exp').unsigned().defaultTo(10).notNullable();
      table.integer('prev_exp').unsigned().defaultTo(0).notNullable();

      table.integer('reputation').defaultTo(0).notNullable();

      table.integer('T').unsigned().defaultTo(0).notNullable();
      table.integer('R').unsigned().defaultTo(0).notNullable();

      table.integer('user_id').references('tc_users.id');
    })

    /**
     * skill 스키마
     *
     */
    .createTable('tc_skills', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('name');
      table.string('img');
      table.string('description');
    })

    /**
     * skill - property 스키마
     *
     */
    .createTable('tc_skill_properties', (table) => {
      table.increments('id').primary();
      table.boolean('leveling');
      table.integer('cooltime');

      table.integer('skill_id').references('tc_skills.id');
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .createTable('tc_user_skills', (table) => {
      table.increments('id').primary();
      table.integer('level').defaultTo(1).notNullable();

      table.timestamp('using_at');
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
      table.timestamp('typed_at'); //used, save

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
      table.integer('reputation').defaultTo(0);
      table.integer('T').defaultTo(0);
      table.integer('R').defaultTo(0);
      table.integer('badge');
      table.integer('grade');

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

      table.integer('tc_reputation_definition_id').references('tc_reputation_definitions.id');
      table.integer('tc_user_id').references('tc_users.id');
    })

    /**
     * point - definition 스키마
     *
     */
    .createTable('tc_point_definitions', (table) => {
      table.increments('id').primary();
      table.string('point_type').notNullable(); // T, R
      table.string('action_type'); // action_type
      table.string('action');
      table.string('description');
      table.integer('point_value').notNullable();
    })

    .createTable('tc_user_point_logs', (table) => {
      table.increments('id').primary();
      table.timestamp('created_at');

      table.integer('tc_point_definition_id').references('tc_point_definitions.id');
      table.integer('tc_user_id').references('tc_users.id');
    })

    /**
     * exp - definition 스키마
     *
     */
    .createTable('tc_exp_definitions', (table) => {
      table.increments('id').primary();
      table.string('action_type'); // action_type
      table.string('action');
      table.string('description');
      table.integer('exp_value').notNullable();
    })

    .createTable('tc_user_exp_logs', (table) => {
      table.increments('id').primary();
      table.timestamp('created_at');

      table.integer('tc_exp_definition_id').references('tc_exp_definitions.id');
      table.integer('tc_user_id').references('tc_users.id');
    })

    /**
     * Club
     *
     *  - Club
     *    '의류, 자동차, 컴퓨터, 게임, 화장품'
     *    ㄴ category_group
     *       의류 - '남성의류, 여성의류, 아동의류, 잡화',
     *       컴퓨터 - '모니터, CPU, 그래픽카드',
     *       컴퓨터 - '모니터, CPU, 그래픽카드'
     *      ㄴ category 
     *         남성의류 - '상의, 하의, 원피스, 아우터, 트레이닝',
     *         여성의류 - '상의, 하의, 원피스, 아우터, 트레이닝'
     *        ㄴ forum
     *           상의 - '블라우스/니트/셔츠, 티셔츠, 니트/스웨터', 
     *           하의 - '팬츠/바지, 청바지/진, 스커트/치마'
     *          ㄴ post : 티셔츠
     *            ㄴ prefix : '기본, 브이넥, 라운드, 무지, 프린트'
     */
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
      
      table.integer('club_category_group_id').references('tc_club_category_groups.id');
    })

    .createTable('tc_forums', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('order');
      table.string('using');
      table.string('description');
      
      table.integer('category_id').references('tc_club_categories.id');
    })

    .createTable('tc_forum_prefixes', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();

      table.integer('forum_id').references('tc_forums.id');
    })

    .createTable('tc_forum_prefix_permissions', (table) => {
      table.increments('id').primary();

      table.integer('role_id').references('tc_roles.id');
    })

    .createTable('tc_posts', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.integer('like_count').defaultTo(0);
      table.integer('comment_count').defaultTo(0);
      table.integer('view_count').defaultTo(0);
      table.integer('scrap_count').defaultTo(0);
      table.boolean('deleted').defaultTo(0);
      table.string('has_img');
      table.string('has_video');
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at');

      table.integer('author_id').references('tc_users.id');
      table.integer('club_id').references('tc_clubs.id');
      table.integer('category_group_id').references('tc_club_category_groups.id');
      table.integer('category_id').references('tc_club_categories.id');
      table.integer('forum_id').references('tc_forums.id');
      table.integer('prefix_id').references('tc_forum_prefixes.id');
    })
    
    .createTable('tc_post_views', (table) => {
      table.increments('id').primary();
      
      table.integer('post_id');
      table.integer('user_id');
      table.string('ip');
      table.timestamp('view_at');
      table.timestamp('updated_at');
    })

    .createTable('tc_comments', (table) => {
      table.increments('id').primary();
      table.text('content').notNullable();
      table.integer('like_count').defaultTo(0);
      table.integer('sub_comment_count').defaultTo(0);
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at');
      table.boolean('deleted').defaultTo(0);


      table.integer('author_id').references('tc_users.id');
      table.integer('post_id').references('tc_posts.id');
    })

    .createTable('tc_sub_comments', (table) => {
      table.increments('id').primary();
      table.text('content').notNullable();
      table.integer('like_count').defaultTo(0);
      table.boolean('deleted').defaultTo(0);
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at');

      table.integer('author_id').references('tc_users.id');
      table.integer('comment_id').references('tc_comments.id');
    })

    .createTable('tc_likes', (table) => {
      table.increments('id').primary();
      table.string('type').notNullable();   // post, comment, sub_comment
      table.string('type_id').notNullable();  // post.id, comment.id, sub_comment.id

      table.integer('liker_id').references('tc_users.id');
    })

    .createTable('tc_user_like_logs', (table) => {
      table.increments('id').primary();
      table.string('type').notNullable();   // post, comment, sub_comment
      table.string('type_id').notNullable();  // post.id, comment.id, sub_comment.id
      table.string('action_type').notNullable();  // like, dislike
      table.timestamp('action_at');

      table.integer('liker_id').references('tc_users.id');
    })

    .createTable('tc_tags', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
    })

    .createTable('tc_post_has_tags', (table) => {
      table.increments('id').primary();

      table.integer('post_id').references('tc_posts.id');
      table.integer('tag_id').references('tc_tags.id');
    })

    .createTable('tc_user_scraps', (table) => {
      table.increments('id').primary();
      table.string('type').notNullable(); // post, club, category
      table.string('type_id').notNullable(); // post, comment
      table.timestamp('action_type').notNullable(); //add ,delete
      table.timestamp('action_at').notNullable();

      table.integer('user_id').references('tc_users.id');
    })

    .createTable('tc_user_reports', (table) => {
      table.increments('id').primary();
      table.string('type').notNullable(); // post, comment, sub_comment, user
      table.string('type_id').notNullable();

      table.string('report_type').notNullable();  // 광고, 음란, 비방 등등
      table.string('description').notNullable();
      table.timestamp('created_at').notNullable();

      table.integer('reporter_id').references('tc_users.id');
    })
    
    .createTable('tc_user_notifications', (table) => {
      table.increments('id').primary();

      table.string('type');
      table.string('description');

      table.boolean('read');
      table.timestamp('read_at');

      table.integer('target_id');
      table.integer('count');
      
      table.timestamp('receive_at');
      table.integer('from').references('tc_users.id');
      table.integer('user_id').references('tc_users.id');

    })
};

exports.down = (knex, Promise) => {
  return knex
    .schema
    .dropTable('tc_user_notifications')
    
    .dropTable('tc_user_reports')
    .dropTable('tc_user_scraps')

    .dropTable('tc_post_has_tags')
    .dropTable('tc_tags')

    .dropTable('tc_user_like_logs')
    .dropTable('tc_likes')

    .dropTable('tc_sub_comments')

    .dropTable('tc_comments')

    .dropTable('tc_post_views')
    .dropTable('tc_posts')

    .dropTable('tc_forum_prefix_permissions')
    .dropTable('tc_forum_prefixes')

    .dropTable('tc_forums')

    .dropTable('tc_club_categories')
    .dropTable('tc_club_category_groups')
    .dropTable('tc_clubs')

    .dropTable('tc_user_exp_logs')
    .dropTable('tc_exp_definitions')

    .dropTable('tc_user_point_logs')
    .dropTable('tc_point_definitions')

    .dropTable('tc_user_reputation_logs')
    .dropTable('tc_reputation_definitions')

    .dropTable('tc_user_grades')
    .dropTable('tc_grade_requires')
    .dropTable('tc_grades')


    .dropTable('tc_user_skill_logs')
    .dropTable('tc_user_skills')
    .dropTable('tc_skill_requires')
    .dropTable('tc_skill_properties')
    .dropTable('tc_skills')

    .dropTable('tc_user_trendboxes')

    .dropTable('tc_user_having_icons')
    .dropTable('tc_icons')

    .dropTable('tc_user_badges')
    .dropTable('tc_badges')

    .dropTable('tc_user_profiles')
    .dropTable('tc_user_roles')
    .dropTable('tc_roles')

    .dropTable('tc_user_password_find_logs')
    .dropTable('tc_user_login_logs')
    .dropTable('tc_user_password_change_logs')
    .dropTable('tc_user_passwords')

    .dropTable('tc_users')
};