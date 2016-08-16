const chai = require('chai');
const Db = require('../../index').Models;
const shortId = require('shortid');

chai.should();

// Constant
const {
  userObj,
  passwordObj,
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
  follow_forumsObj,
  reportPostObj,
  reportCommentObj,
  reportSubCommentObj,
  forumCreatedObj
} = require('./testData');

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

    const userObj = {
      email: 'test@test.co.kr',
      nick: 'test',
      uid: shortId.generate()
    };

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

              done();
            });
        }
      })
  });

  describe('tc_user > password', () => {


    it('tc_user should relate password', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('password')
            .insert(passwordObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('password')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > role', () => {


    it('tc_user should relate role', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('role')
            .insert({
              role_id: 1
            })
        })
        .then(result => {
          result.role_id.should.equal(1);
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('role')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > profile', () => {


    it('tc_user should relate profile', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('profile')
            .insert(userProfileObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('profile')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > icon', () => {

    it('tc_user should relate icon', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('icon')
            .insert(iconObj)
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('icon')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > trendbox', () => {

    it('tc_user should relate trendbox', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('trendbox')
            .insert(trendboxObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('trendbox')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > skills', () => {

    it('tc_user should relate skills', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('skills')
            .insert(skillsObj)
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('skills')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > grade', () => {

    it('tc_user should relate grade', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('grade')
            .insert(gradeObj)
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('grade')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > posts', () => {

    it('tc_user should relate posts', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('posts')
            .insert(postsObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('posts')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > postLikes', () => {

    it('tc_user should relate postLikes', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          postLikesObj.liker_id = user.id;

          return user
            .$relatedQuery('postLikes')
            .insert(postLikesObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('postLikes')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > comments', () => {

    it('tc_user should relate comments', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('comments')
            .insert(commentsObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('comments')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > commentLikes', () => {

    it('tc_user should relate commentLikes', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          commentLikesObj.liker_id = user.id;

          return user
            .$relatedQuery('commentLikes')
            .insert(commentLikesObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('commentLikes')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > subComments', () => {

    it('tc_user should relate subComments', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('subComments')
            .insert(subCommentsObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('subComments')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > subCommentLikes', () => {

    it('tc_user should relate subCommentLikes', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          subCommentLikesObj.liker_id = user.id;

          return user
            .$relatedQuery('subCommentLikes')
            .insert(subCommentLikesObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('subCommentLikes')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > notifications', () => {

    it('tc_user should relate notifications', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('notifications')
            .insert(notificationsObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('notifications')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > collections', () => {

    it('tc_user should relate collections', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('collections')
            .insert(collectionsObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('collections')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > follow_forums', () => {

    it('tc_user should relate follow_forums', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('follow_forums')
            .insert(follow_forumsObj)
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('follow_forums')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > reportPost', () => {

    it('tc_user should relate reportPost', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('reportPost')
            .insert(reportPostObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('reportPost')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > reportComment', () => {

    it('tc_user should relate reportComment', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('reportComment')
            .insert(reportCommentObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('reportComment')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > reportSubComment', () => {

    it('tc_user should relate reportSubComment', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('reportSubComment')
            .insert(reportSubCommentObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('reportSubComment')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_user > forumCreated', () => {

    it('tc_user should relate forumCreated', done => {
      "use strict";
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('forumCreated')
            .insert(forumCreatedObj)
        })
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
      Db
        .tc_users
        .query()
        .where(userObj)
        .first()
        .then(user => {
          return user
            .$relatedQuery('forumCreated')
            .delete()
        })
        .then(() => {
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