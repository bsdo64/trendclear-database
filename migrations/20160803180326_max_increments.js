exports.up = function(knex, Promise) {
  return knex
    .schema
    .table('tc_users', (table) => {
      `ALTER TABLE tc_badges modify id INT AUTO_INCREMENT;
      ALTER TABLE tc_badges AUTO_INCREMENT = 0;`;
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_user_passwords', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_user_password_change_logs', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_user_login_logs', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * 회원 - 비밀번호 찾기 로그 스키마
     */
    .table('tc_user_password_find_logs', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
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
    .table('tc_roles', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * 회원 - role 스키마
     *
     */
    .table('tc_user_roles', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * 회원 - profile 스키마
     *
     */
    .table('tc_user_profiles', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * badge 스키마
     *
     */
    .table('tc_badges', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * 회원 - badge 스키마
     *
     */
    .table('tc_user_badges', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * icon 스키마
     *
     */
    .table('tc_icons', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * 회원 - having icon 스키마
     *
     */
    .table('tc_user_having_icons', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * 회원 - trendbox 스키마
     *
     */
    .table('tc_user_trendboxes', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * skill 스키마
     *
     */
    .table('tc_skills', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * skill - property 스키마
     *
     */
    .table('tc_skill_properties', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .table('tc_user_skills', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * skill - 레벨 스키마
     *
     */
    .table('tc_user_skill_logs', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .table('tc_skill_requires', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
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
    .table('tc_grades', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .table('tc_grade_requires', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * 회원 - grade 스키마
     *
     */
    .table('tc_user_grades', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * reputation - definition 스키마
     *
     */
    .table('tc_reputation_definitions', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_user_reputation_logs', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * point - definition 스키마
     *
     */
    .table('tc_point_definitions', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_user_point_logs', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    /**
     * exp - definition 스키마
     *
     */
    .table('tc_exp_definitions', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_user_exp_logs', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
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
    .table('tc_clubs', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_club_category_groups', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_club_categories', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_forums', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_forum_prefixes', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_forum_prefix_permissions', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_posts', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_post_views', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_comments', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_sub_comments', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_likes', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_user_like_logs', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_tags', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_post_has_tags', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_user_scraps', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_user_reports', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })

    .table('tc_user_notifications', (table) => {
      knex.raw(`ALTER TABLE ? modify id INT AUTO_INCREMENT`, [table._tableName]);
      knex.raw(`ALTER TABLE ? AUTO_INCREMENT = 0`, [table._tableName]);
    })
};

exports.down = function(knex, Promise) {};
