const chai = require('chai');
const Db = require('../../index').Models;
const shortId = require('shortid');

chai.should();

// Constant
const {
  userObj,
  postsObj,
  tagsObj,
  prefixesObj,
  commentsObj,
  postLikesObj
} = require('./testData');

const testObj = {};
describe('DB Models - tc_posts', function() {

  it("tc_posts should return posts", done => {
    "use strict";

    Db
      .tc_posts
      .query()
      .then(posts => {
        posts.should.be.a('array');

        if (posts.length > 0) {
          (posts[0] instanceof Db.tc_posts).should.equal(true)
        }

        done();
      })
  });

  before(done => {
    "use strict";

    Db
      .tc_posts
      .query()
      .where({title: postsObj.title})
      .first()
      .then(post => {
        if (post) {
          testObj.post = post;
          done();
        } else {
          Db
            .tc_posts
            .query()
            .insert(postsObj)
            .then(post => {
              post.title.should.equal(postsObj.title);
              post.content.should.equal(postsObj.content);

              testObj.post = post;
              done();
            });
        }
      })
  });

  describe('tc_post > tags', () => {

    it('tc_post should relate tags', done => {
      "use strict";
      testObj
        .post
        .$relatedQuery('tags')
        .insert(tagsObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_post should eager tags', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .eager('tags')
        .first()
        .then(result => {
          result.should.have.property('tags');
          done();
        })
    });

    it('tc_post should unrelate tags', done => {
      "use strict";
      testObj
        .post
        .$relatedQuery('tags')
        .unrelate()
        .where('name', tagsObj.name)
        .then(() => {

          return Db
            .tc_tags
            .query()
            .delete()
            .where('name', tagsObj.name)
        })
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        });
    });
  });

  describe('tc_post > prefixes', () => {

    it('tc_post should relate prefixes', done => {
      "use strict";
      testObj
        .post
        .$relatedQuery('prefix')
        .insert(prefixesObj)
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_post should eager prefixes', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .eager('prefix')
        .first()
        .then(result => {
          result.should.have.property('prefix');
          done();
        })
    });

    it('tc_post should unrelate prefixes', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .first()
        .then(result => {
          return result
            .$relatedQuery('prefix')
            .unrelate()
        })
        .then((deletedItem) => {
          deletedItem.should.equals(1);

          return Db
            .tc_forum_prefixes
            .query()
            .delete()
            .where('name', prefixesObj.name)
        })
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        });
    });
  });

  describe('tc_post > forums', () => {

    it('tc_post should relate forums', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .first()
        .then(post => {
          return post
            .$relatedQuery('forum')
            .relate({id: 13})
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_post should eager forums', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .eager('forum')
        .first()
        .then(result => {
          result.should.have.property('forum');
          done();
        })
    });

  });

  describe('tc_post > author', () => {

    it('tc_post should relate author', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .first()
        .then(post => {
          return post
            .$relatedQuery('author')
            .relate({id: 2})
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_post should eager author', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .eager('author')
        .first()
        .then(result => {
          result.should.have.property('author');
          done();
        })
    });

  });

  describe('tc_post > comments', () => {

    it('tc_post should relate comments', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .first()
        .then(forum => {
          return forum
            .$relatedQuery('comments')
            .insert(commentsObj)
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_post should eager comments', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .eager('comments')
        .first()
        .then(post => {
          post.should.have.property('comments');
          done();
        })
    });

    it('tc_post should delete comments', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .first()
        .then(post => {
          return post
            .$relatedQuery('comments')
            .delete()
        })
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });

  describe('tc_post > likes', () => {

    it('create test user', done => {
      userObj.uid = shortId.generate();
      Db
        .tc_users
        .query()
        .insert(userObj)
        .then(user => {
          testObj.user = user;
          done();
        })
    });

    it('tc_post should relate likes', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .first()
        .then(forum => {
          postLikesObj.liker_id = testObj.user.id;

          return forum
            .$relatedQuery('likes')
            .insert(postLikesObj)
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_post should eager likes', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .eager('likes')
        .first()
        .then(post => {
          post.should.have.property('likes');
          done();
        })
    });

    it('tc_post should delete likes', done => {
      "use strict";
      Db
        .tc_posts
        .query()
        .where(postsObj)
        .first()
        .then(post => {
          return post
            .$relatedQuery('likes')
            .delete()
        })
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          return testObj.user.$query().delete();
        })
        .then((deletedItem) => {
          deletedItem.should.equals(1);
          done();
        })
    })
  });


  after((done) => {
    "use strict";

    Db
      .tc_posts
      .query()
      .delete()
      .where(postsObj)
      .then(numDeleted => {
        numDeleted.should.equal(1);

        done();
      })
  });

});