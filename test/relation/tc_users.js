const chai = require('chai');
const Db = require('../../index').Models;
const shortId = require('shortid');

chai.should();

// Constant
const {
  userObj,
  passwordObj,
  roleObj,
  userProfileObj,
  iconObj,
  trendboxObj,
  skillsObj,
  gradeObj,
  postsObj,
  postLikesObj,
  commentsObj,
  commentLikesObj,
  subCommentLikesObj,
  subCommentsObj,
  notificationsObj,
  collectionsObj,
  forumObj,
  reportPostObj,
  reportCommentObj,
  reportSubCommentObj,
  forumCreatedObj
} = require('./testData');


const testObj = {};
describe('DB Models - tc_users', function() {

  it("tc_users should return users", done => {
    "use strict";
    Db
      .tc_users
      .query()
      .then(users => {
        users.should.be.a('array');

        if (users.length > 0) {
          (users[0] instanceof Db.tc_users).should.equal(true)
        }

        done();
      })
  });

  before(done => {
    "use strict";

    userObj.uid = shortId.generate();

    Db
      .tc_users
      .query()
      .where({email: userObj.email})
      .first()
      .then(user => {
        if (user) {
          Db
            .tc_users
            .query()
            .delete()
            .where({email: userObj.email})
            .then(() => {
              testObj.user = user;
              done();
            })
        } else {
          Db
            .tc_users
            .query()
            .insert(userObj)
            .then(user => {
              user.email.should.equal(userObj.email);
              user.nick.should.equal(userObj.nick);

              testObj.user = user;
              done();
            });
        }
      })
  });

  describe('tc_user > password', () => {


    it('tc_user should relate password', done => {
      "use strict";

      testObj
        .user
        .$relatedQuery('password')
        .insert(passwordObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager password', done => {
      "use strict";

      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('password')
        .first()
        .then(user => {
          user.should.have.property('password');
          done();
        })
    });

    it('tc_user should delete password', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('password')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > role', () => {

    it('create test role', done => {
      "use strict";

      Db
        .tc_roles
        .query()
        .insert(roleObj)
        .then(result => {
          testObj.role = result;
          done();
        })
    });

    it('tc_user should relate role', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('role')
        .insert({
          role_id: testObj.role.id
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager role', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('role')
        .first()
        .then(user => {
          user.should.have.property('role');
          done();
        })
    });

    it('tc_user should delete role', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('role')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          return testObj.role.$query().delete()
        })
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > profile', () => {


    it('tc_user should relate profile', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('profile')
        .insert(userProfileObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager profile', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('profile')
        .first()
        .then(user => {
          user.should.have.property('profile');
          done();
        })
    });

    it('tc_user should delete profile', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('profile')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > icon', () => {

    it('create test icon', done => {
      "use strict";

      Db
        .tc_icons
        .query()
        .insert(iconObj)
        .then(result => {
          testObj.icon = result;
          done();
        })
    });

    it('tc_user should relate icon', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('icon')
        .insert({
          icon_id: testObj.icon.id,
          keeping_at: new Date()
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager icon', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('icon')
        .first()
        .then(user => {
          user.should.have.property('icon');
          done();
        })
    });

    it('tc_user should delete icon', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('icon')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          return testObj.icon.$query().delete();
        })
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > trendbox', () => {

    it('tc_user should relate trendbox', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('trendbox')
        .insert(trendboxObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager trendbox', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('trendbox')
        .first()
        .then(user => {
          user.should.have.property('trendbox');
          done();
        })
    });

    it('tc_user should delete trendbox', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('trendbox')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > skills', () => {

    it('create test skill', done => {
      "use strict";

      Db
        .tc_skills
        .query()
        .insert(skillsObj)
        .then(result => {
          testObj.skill = result;
          done();
        })
    });

    it('tc_user should relate skills', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('skills')
        .insert({
          skill_id: testObj.skill.id,
          using_at: new Date(),
          level: 1
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager skills', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('skills')
        .first()
        .then(user => {
          user.should.have.property('skills');
          done();
        })
    });

    it('tc_user should delete skills', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('skills')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          return testObj.skill.$query().delete()
        })
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > grade', () => {

    it('create test grade', done => {
      "use strict";

      Db
        .tc_grades
        .query()
        .insert(gradeObj)
        .then(result => {
          testObj.grade = result;
          done();
        })
    });

    it('tc_user should relate grade', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('grade')
        .insert({
          grade_id: testObj.grade.id
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager grade', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('grade')
        .first()
        .then(user => {
          user.should.have.property('grade');
          done();
        })
    });

    it('tc_user should delete grade', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('grade')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);

          return testObj.grade.$query().delete()
        })
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > posts', () => {

    it('tc_user should relate posts', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('posts')
        .insert(postsObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager posts', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('posts')
        .first()
        .then(user => {
          user.should.have.property('posts');
          done();
        })
    });

    it('tc_user should delete posts', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('posts')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > postLikes', () => {

    it('tc_user should relate postLikes', done => {
      "use strict";
      postLikesObj.liker_id = testObj.user.id;

      testObj
        .user
        .$relatedQuery('postLikes')
        .insert(postLikesObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager postLikes', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('postLikes')
        .first()
        .then(user => {
          user.should.have.property('postLikes');
          done();
        })
    });

    it('tc_user should delete postLikes', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('postLikes')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > comments', () => {

    it('tc_user should relate comments', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('comments')
        .insert(commentsObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager comments', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('comments')
        .first()
        .then(user => {
          user.should.have.property('comments');
          done();
        })
    });

    it('tc_user should delete comments', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('comments')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > commentLikes', () => {

    it('tc_user should relate commentLikes', done => {
      "use strict";
      commentLikesObj.liker_id = testObj.user.id;

      testObj
        .user
        .$relatedQuery('commentLikes')
        .insert(commentLikesObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager commentLikes', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('commentLikes')
        .first()
        .then(user => {
          user.should.have.property('commentLikes');
          done();
        })
    });

    it('tc_user should delete commentLikes', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('commentLikes')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > subComments', () => {

    it('tc_user should relate subComments', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('subComments')
        .insert(subCommentsObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager subComments', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('subComments')
        .first()
        .then(user => {
          user.should.have.property('subComments');
          done();
        })
    });

    it('tc_user should delete subComments', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('subComments')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > subCommentLikes', () => {

    it('tc_user should relate subCommentLikes', done => {
      "use strict";
      subCommentLikesObj.liker_id = testObj.user.id;

      testObj
        .user
        .$relatedQuery('subCommentLikes')
        .insert(subCommentLikesObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager subCommentLikes', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('subCommentLikes')
        .first()
        .then(user => {
          user.should.have.property('subCommentLikes');
          done();
        })
    });

    it('tc_user should delete subCommentLikes', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('subCommentLikes')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > notifications', () => {

    it('tc_user should relate notifications', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('notifications')
        .insert(notificationsObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager notifications', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('notifications')
        .first()
        .then(user => {
          user.should.have.property('notifications');
          done();
        })
    });

    it('tc_user should delete notifications', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('notifications')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > collections', () => {

    it('tc_user should relate collections', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('collections')
        .insert(collectionsObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager collections', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('collections')
        .first()
        .then(user => {
          user.should.have.property('collections');
          done();
        })
    });

    it('tc_user should delete collections', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('collections')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > follow_forums', () => {

    it('create test forum', done => {
      "use strict";

      Db
        .tc_forums
        .query()
        .insert(forumObj)
        .then(result => {
          testObj.forum = result;
          done();
        })
    });

    it('tc_user should relate follow_forums', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('follow_forums')
        .insert({
          forum_id: testObj.forum.id
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager follow_forums', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('follow_forums')
        .first()
        .then(user => {
          user.should.have.property('follow_forums');
          done();
        })
    });

    it('tc_user should delete follow_forums', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('follow_forums')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);

          return testObj.forum.$query().delete()
        })
        .then(deletedItem => {
          deletedItem.should.equals(1);

          done();
        })
    })
  });

  describe('tc_user > reportPost', () => {

    it('tc_user should relate reportPost', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('reportPost')
        .insert(reportPostObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager reportPost', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('reportPost')
        .first()
        .then(user => {
          user.should.have.property('reportPost');
          done();
        })
    });

    it('tc_user should delete reportPost', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('reportPost')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > reportComment', () => {

    it('tc_user should relate reportComment', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('reportComment')
        .insert(reportCommentObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager reportComment', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('reportComment')
        .first()
        .then(user => {
          user.should.have.property('reportComment');
          done();
        })
    });

    it('tc_user should delete reportComment', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('reportComment')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > reportSubComment', () => {

    it('tc_user should relate reportSubComment', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('reportSubComment')
        .insert(reportSubCommentObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager reportSubComment', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('reportSubComment')
        .first()
        .then(user => {
          user.should.have.property('reportSubComment');
          done();
        })
    });

    it('tc_user should delete reportSubComment', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('reportSubComment')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_user > forumCreated', () => {

    it('tc_user should relate forumCreated', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('forumCreated')
        .insert(forumCreatedObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_user should eager forumCreated', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .eager('forumCreated')
        .first()
        .then(user => {
          user.should.have.property('forumCreated');
          done();
        })
    });

    it('tc_user should delete forumCreated', done => {
      "use strict";
      testObj
        .user
        .$relatedQuery('forumCreated')
        .delete()
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  after((done) => {
    "use strict";

    Db
      .tc_users
      .query()
      .delete()
      .where(userObj)
      .then(numDeleted => {
        numDeleted.should.equal(1);

        done();
      })
  });

});