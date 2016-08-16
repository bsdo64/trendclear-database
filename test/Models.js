const chai = require('chai');
const Db = require('../index').Models;
chai.should();

describe('DB Models', function() {

  // test cases
  it("DB should have models", done => {
    "use strict";

    Db.tc_badges.should.be.a('function');
    Db.tc_collection_forums.should.be.a('function');
    Db.tc_collections.should.be.a('function');
    Db.tc_comments.should.be.a('function');
    Db.tc_forum_prefix_permissions.should.be.a('function');
    Db.tc_forum_prefixes.should.be.a('function');
    Db.tc_forums.should.be.a('function');
    Db.tc_grade_requires.should.be.a('function');
    Db.tc_grades.should.be.a('function');
    Db.tc_icons.should.be.a('function');
    Db.tc_likes.should.be.a('function');
    Db.tc_point_definitions.should.be.a('function');
    Db.tc_post_has_tags.should.be.a('function');
    Db.tc_post_views.should.be.a('function');
    Db.tc_posts.should.be.a('function');
    Db.tc_reputation_definitions.should.be.a('function');
    Db.tc_roles.should.be.a('function');
    Db.tc_skill_properties.should.be.a('function');
    Db.tc_skills.should.be.a('function');
    Db.tc_sub_comments.should.be.a('function');
    Db.tc_tags.should.be.a('function');
    Db.tc_user_badges.should.be.a('function');
    Db.tc_user_exp_logs.should.be.a('function');
    Db.tc_user_follow_forums.should.be.a('function');
    Db.tc_user_grades.should.be.a('function');
    Db.tc_user_having_icons.should.be.a('function');
    Db.tc_user_like_logs.should.be.a('function');
    Db.tc_user_login_logs.should.be.a('function');
    Db.tc_user_password_change_logs.should.be.a('function');
    Db.tc_user_password_find_logs.should.be.a('function');
    Db.tc_user_passwords.should.be.a('function');
    Db.tc_user_point_logs.should.be.a('function');
    Db.tc_user_profiles.should.be.a('function');
    Db.tc_user_reports.should.be.a('function');
    Db.tc_user_reputation_logs.should.be.a('function');
    Db.tc_user_roles.should.be.a('function');
    Db.tc_user_scraps.should.be.a('function');
    Db.tc_user_skill_logs.should.be.a('function');
    Db.tc_user_skills.should.be.a('function');
    Db.tc_user_trendboxes.should.be.a('function');
    Db.tc_users.should.be.a('function');

    done();
  })
});