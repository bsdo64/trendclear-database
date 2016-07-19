
exports.up = function(knex, Promise) {
  return knex
    .schema

    .table('tc_users', (table) => {
      table.index('id');
    })

    .table('tc_user_passwords', (table) => {
      table.index('id');
    })

    .table('tc_user_password_change_logs', (table) => {
      table.index('id');
    })

    .table('tc_user_login_logs', (table) => {
      table.index('id');
    })

    /**
     * 회원 - 비밀번호 찾기 로그 스키마
     */
    .table('tc_user_password_find_logs', (table) => {
      table.index('id')
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
      table.index('id')
    })

    /**
     * 회원 - role 스키마
     *
     */
    .table('tc_user_roles', (table) => {
      table.index('id')
    })

    /**
     * 회원 - profile 스키마
     *
     */
    .table('tc_user_profiles', (table) => {
      table.index('id')
    })

    /**
     * badge 스키마
     *
     */
    .table('tc_badges', (table) => {
      table.index('id')
    })

    /**
     * 회원 - badge 스키마
     *
     */
    .table('tc_user_badges', (table) => {
      table.index('id')
    })

    /**
     * icon 스키마
     *
     */
    .table('tc_icons', (table) => {
      table.index('id')
    })

    /**
     * 회원 - having icon 스키마
     *
     */
    .table('tc_user_having_icons', (table) => {
      table.index('id')
    })

    /**
     * 회원 - trendbox 스키마
     *
     */
    .table('tc_user_trendboxes', (table) => {
      table.index('id')
    })

    /**
     * skill 스키마
     *
     */
    .table('tc_skills', (table) => {
      table.index('id')
    })

    /**
     * skill - property 스키마
     *
     */
    .table('tc_skill_properties', (table) => {
      table.index('id')
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .table('tc_user_skills', (table) => {
      table.index('id')
    })

    /**
     * skill - 레벨 스키마
     *
     */
    .table('tc_user_skill_logs', (table) => {
      table.index('id')
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .table('tc_skill_requires', (table) => {
      table.index('id')
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
      table.index('id')
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .table('tc_grade_requires', (table) => {
      table.index('id')
    })

    /**
     * 회원 - grade 스키마
     *
     */
    .table('tc_user_grades', (table) => {
      table.index('id')
    })

    /**
     * reputation - definition 스키마
     *
     */
    .table('tc_reputation_definitions', (table) => {
      table.index('id')
    })

    .table('tc_user_reputation_logs', (table) => {
      table.index('id')
    })

    /**
     * point - definition 스키마
     *
     */
    .table('tc_point_definitions', (table) => {
      table.index('id')
    })

    .table('tc_user_point_logs', (table) => {
      table.index('id')
    })

    /**
     * exp - definition 스키마
     *
     */
    .table('tc_exp_definitions', (table) => {
      table.index('id')
    })

    .table('tc_user_exp_logs', (table) => {
      table.index('id')
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
      table.index('id')
    })

    .table('tc_club_category_groups', (table) => {
      table.index('id')
    })

    .table('tc_club_categories', (table) => {
      table.index('id')
    })

    .table('tc_forums', (table) => {
      table.index('id')
    })

    .table('tc_forum_prefixes', (table) => {
      table.index('id')
    })

    .table('tc_forum_prefix_permissions', (table) => {
      table.index('id')
    })

    .table('tc_posts', (table) => {
      table.index('id')
    })

    .table('tc_post_views', (table) => {
      table.index('id')
    })

    .table('tc_comments', (table) => {
      table.index('id')
    })

    .table('tc_sub_comments', (table) => {
      table.index('id')
    })

    .table('tc_likes', (table) => {
      table.index('id')
    })

    .table('tc_user_like_logs', (table) => {
      table.index('id')
    })

    .table('tc_tags', (table) => {
      table.index('id')
    })

    .table('tc_post_has_tags', (table) => {
      table.index('id')
    })

    .table('tc_user_scraps', (table) => {
      table.index('id')
    })

    .table('tc_user_reports', (table) => {
      table.index('id')
    })

    .table('tc_user_notifications', (table) => {
      table.index('id')
    })
};

exports.down = function(knex, Promise) {
  return knex
    .schema

    .table('tc_users', (table) => {
      table.dropIndex('id');
    })

    .table('tc_user_passwords', (table) => {
      table.dropIndex('id');
    })

    .table('tc_user_password_change_logs', (table) => {
      table.dropIndex('id');
    })

    .table('tc_user_login_logs', (table) => {
      table.dropIndex('id');
    })

    /**
     * 회원 - 비밀번호 찾기 로그 스키마
     */
    .table('tc_user_password_find_logs', (table) => {
      table.dropIndex('id')
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
      table.dropIndex('id')
    })

    /**
     * 회원 - role 스키마
     *
     */
    .table('tc_user_roles', (table) => {
      table.dropIndex('id')
    })

    /**
     * 회원 - profile 스키마
     *
     */
    .table('tc_user_profiles', (table) => {
      table.dropIndex('id')
    })

    /**
     * badge 스키마
     *
     */
    .table('tc_badges', (table) => {
      table.dropIndex('id')
    })

    /**
     * 회원 - badge 스키마
     *
     */
    .table('tc_user_badges', (table) => {
      table.dropIndex('id')
    })

    /**
     * icon 스키마
     *
     */
    .table('tc_icons', (table) => {
      table.dropIndex('id')
    })

    /**
     * 회원 - having icon 스키마
     *
     */
    .table('tc_user_having_icons', (table) => {
      table.dropIndex('id')
    })

    /**
     * 회원 - trendbox 스키마
     *
     */
    .table('tc_user_trendboxes', (table) => {
      table.dropIndex('id')
    })

    /**
     * skill 스키마
     *
     */
    .table('tc_skills', (table) => {
      table.dropIndex('id')
    })

    /**
     * skill - property 스키마
     *
     */
    .table('tc_skill_properties', (table) => {
      table.dropIndex('id')
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .table('tc_user_skills', (table) => {
      table.dropIndex('id')
    })

    /**
     * skill - 레벨 스키마
     *
     */
    .table('tc_user_skill_logs', (table) => {
      table.dropIndex('id')
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .table('tc_skill_requires', (table) => {
      table.dropIndex('id')
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
      table.dropIndex('id')
    })

    /**
     * 회원 - skill 스키마
     *
     */
    .table('tc_grade_requires', (table) => {
      table.dropIndex('id')
    })

    /**
     * 회원 - grade 스키마
     *
     */
    .table('tc_user_grades', (table) => {
      table.dropIndex('id')
    })

    /**
     * reputation - definition 스키마
     *
     */
    .table('tc_reputation_definitions', (table) => {
      table.dropIndex('id')
    })

    .table('tc_user_reputation_logs', (table) => {
      table.dropIndex('id')
    })

    /**
     * point - definition 스키마
     *
     */
    .table('tc_point_definitions', (table) => {
      table.dropIndex('id')
    })

    .table('tc_user_point_logs', (table) => {
      table.dropIndex('id')
    })

    /**
     * exp - definition 스키마
     *
     */
    .table('tc_exp_definitions', (table) => {
      table.dropIndex('id')
    })

    .table('tc_user_exp_logs', (table) => {
      table.dropIndex('id')
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
      table.dropIndex('id')
    })

    .table('tc_club_category_groups', (table) => {
      table.dropIndex('id')
    })

    .table('tc_club_categories', (table) => {
      table.dropIndex('id')
    })

    .table('tc_forums', (table) => {
      table.dropIndex('id')
    })

    .table('tc_forum_prefixes', (table) => {
      table.dropIndex('id')
    })

    .table('tc_forum_prefix_permissions', (table) => {
      table.dropIndex('id')
    })

    .table('tc_posts', (table) => {
      table.dropIndex('id')
    })

    .table('tc_post_views', (table) => {
      table.dropIndex('id')
    })

    .table('tc_comments', (table) => {
      table.dropIndex('id')
    })

    .table('tc_sub_comments', (table) => {
      table.dropIndex('id')
    })

    .table('tc_likes', (table) => {
      table.dropIndex('id')
    })

    .table('tc_user_like_logs', (table) => {
      table.dropIndex('id')
    })

    .table('tc_tags', (table) => {
      table.dropIndex('id')
    })

    .table('tc_post_has_tags', (table) => {
      table.dropIndex('id')
    })

    .table('tc_user_scraps', (table) => {
      table.dropIndex('id')
    })

    .table('tc_user_reports', (table) => {
      table.dropIndex('id')
    })

    .table('tc_user_notifications', (table) => {
      table.dropIndex('id')
    })


};
