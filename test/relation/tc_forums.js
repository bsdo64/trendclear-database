'use strict';

const chai = require('chai');
const Db = require('../../index').Models;
const shortId = require('shortid');

chai.should();

// Constant
const {
  forumObj,
  prefixesObj
} = require('./testData');

describe('DB Models - tc_forums', function() {

  it("tc_forums should return forums", done => {
    "use strict";

    Db
      .tc_forums
      .query()
      .then(forums => {
        forums.should.be.a('array');

        if (forums.length > 0) {
          (forums[0] instanceof Db.tc_forums).should.equal(true)
        }

        done();
      })
  });

  before(done => {
    "use strict";

    Db
      .tc_forums
      .query()
      .where({title: forumObj.title})
      .first()
      .then(forum => {
        if (forum) {
          Db
            .tc_forums
            .query()
            .delete()
            .where({title: forumObj.title})
            .then(() => {
              done();
            })
        } else {
          Db
            .tc_forums
            .query()
            .insert(forumObj)
            .then(forum => {
              forum.title.should.equal(forumObj.title);
              forum.description.should.equal(forumObj.description);

              done();
            });
        }
      })
  });

  describe('tc_forum > prefixes', () => {

    it('tc_forum should relate prefixes', done => {
      "use strict";
      Db
        .tc_forums
        .query()
        .where(forumObj)
        .first()
        .then(forum => {
          return forum
            .$relatedQuery('prefixes')
            .insert(prefixesObj)
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_forum should eager prefixes', done => {
      "use strict";
      Db
        .tc_forums
        .query()
        .where(forumObj)
        .eager('prefixes')
        .first()
        .then(forums => {
          forums.should.have.property('prefixes');
          done();
        })
    });

    it('tc_forum should delete prefixes', done => {
      "use strict";
      Db
        .tc_forums
        .query()
        .where(forumObj)
        .first()
        .then(forums => {
          return forums
            .$relatedQuery('prefixes')
            .delete()
        })
        .then(() => {
          done();
        })
    })
  });

  describe('tc_forum > forumOwner', () => {

    it('tc_forum should relate forumOwner', done => {
      "use strict";
      Db
        .tc_forums
        .query()
        .where(forumObj)
        .first()
        .then(forum => {
          return forum
            .$relatedQuery('forumOwner')
            .first()
        })
        .then(result => {
          result.should.be.a('object');
          done();
        })
    });

    it('tc_forum should eager forumOwner', done => {
      "use strict";
      Db
        .tc_forums
        .query()
        .where(forumObj)
        .eager('forumOwner')
        .first()
        .then(result => {
          result.should.have.property('forumOwner');
          done();
        })
    });
  });

  after((done) => {
    "use strict";

    Db
      .tc_forums
      .query()
      .delete()
      .where(forumObj)
      .then(numDeleted => {
        numDeleted.should.equal(1);

        done();
      })
  });

});