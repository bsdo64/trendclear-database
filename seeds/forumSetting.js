const Db = require('../Models/index');
const shortId = require('shortid');

exports.seed = function (knex, Promise) {
  for (var el in Db) {
    Db[el].knex(knex);
  }

  return knex('tc_forum_managers').del()
    .then(function () {

      return Db
        .tc_forums
        .query()
        .then(forums => {
          const insertArray = [];

          for(let index in forums) {
            const forum = forums[index];
            insertArray.push(
              knex('tc_forum_managers').insert({forum_id: forum.id, user_id: forum.creator_id})
            )
          }

          return Promise
            .all(insertArray)
        })
    })
    .then(() => {
      "use strict";

      return Promise
        .join(
          Db
            .tc_user_follow_forums
            .query()
            .select(knex.raw('COUNT(forum_id) as follow_count'), 'forum_id as id')
            .groupBy('forum_id')
            .orderBy('forum_id'),
          Db
            .tc_collections
            .query()
            .select('forum_id as id', knex.raw('count(forum_id) as subs_count'))
            .innerJoin('tc_collection_forums', 'tc_collections.id', '=', 'tc_collection_forums.collection_id')
            .groupBy('forum_id')
            .orderBy('forum_id'),
          Db
            .tc_posts
            .query()
            .select('forum_id as id', knex.raw('count(forum_id) as post_count'))
            .innerJoin('tc_forums', 'tc_posts.forum_id', '=', 'tc_forums.id')
            .where('tc_posts.deleted', '=', false)
            .groupBy('forum_id')
            .orderBy('forum_id'),
          Db
            .tc_posts
            .query(),

          ((follows, subs, post, allPost) => {
            const array = [];
            for (let k in follows) {
              array.push(Db.tc_forums
                .query()
                .patch({follow_count: follows[k].follow_count})
                .where({id: follows[k].id})
              )
            }

            for (let k in subs) {
              array.push(Db.tc_forums
                .query()
                .patch({subs_count: subs[k].subs_count})
                .where({id: subs[k].id})
              )
            }

            for (let k in post) {
              array.push(Db.tc_forums
                .query()
                .patch({post_count: post[k].post_count})
                .where({id: post[k].id})
              );
            }

              for (let k in allPost) {
                array.push(Db.tc_posts
                  .query()
                  .patch({link_id: shortId.generate() + new Date().getTime()})
                  .where({id: allPost[k].id})
                )
              }

            return Promise
              .all(array)
          })
        )
    })
    .then(() => {
      "use strict";

      console.dir(1);
    })
};
