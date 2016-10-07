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

      return Promise
        .join(
          knex.schema.hasColumn('tc_post_views', 'user_id'),
          knex.schema.hasColumn('tc_post_views', 'ip'),
          (existUserId, existIp) => {

            if (existUserId && existIp) {
              return knex
                .schema
                .table('tc_post_views', function (table) {
                  table.dropColumn('user_id');
                  table.dropColumn('ip');
                  table.string('visitor_uid').references('tc_visitors.uuid');
                })
                .then(() => {
                  return Db
                    .tc_posts
                    .query()
                    .patch({view_count: 0})
                })
            } else {
              return null;
            }
          })
    })
    .then(() => {

      return Db
        .tc_categories
        .query()
        .where({title: '베나클'})
        .first()
        .then(venacle => {
          if (!venacle) {
            return knex('tc_categories')
              .increment('order', 1)
              .then(() => {
                return Db
                  .tc_categories
                  .query()
                  .insert({
                    title: '베나클',
                    type: 'venacle',
                    order: 1
                  })
              })
              .then(category => {
                let forums;

                return Db
                  .tc_users
                  .query()
                  .where({email: 'bsdo@naver.com'})
                  .first()
                  .then((user) => Promise.all([

                    Db.tc_forums.query()
                      .where({title: '물어보기'})
                      .first()
                      .then(forum => {
                        if (forum) {
                          return forum;
                        } else {
                          return Db.tc_forums.query().insert({
                            title: '물어보기',
                            order: 1,
                            sub_header: 'Ask Venacle',
                            description: '궁금한거 아무거나 다 물어보세요',
                            creator_id: user.id,
                            rule: '베나클에 관한 궁금증 해결!',
                            using: true
                          })
                        }
                      }),

                    Db.tc_forums.query()
                      .where({title: '요청하기'})
                      .first()
                      .then(forum => {
                        if (forum) {
                          return forum;
                        } else {
                          return Db.tc_forums.query().insert({
                            title: '요청하기',
                            order: 1,
                            sub_header: '빠른 답변',
                            description: '요청 사항을 올려주세요',
                            creator_id: user.id,
                            rule: '베나클에 관한 요청사항을 올려주세요',
                            using: true
                          })
                        }
                      })
                    ])
                  )
                  .then((f) => {
                    forums = f;

                    return Promise.all([
                      Db.tc_forum_categories.query().insert([
                        {category_id: category.id, forum_id: f[0].id},
                        {category_id: category.id, forum_id: f[1].id}
                      ])
                    ])
                  })
                  .then(() => {
                    "use strict";

                    return Db
                      .tc_users
                      .query()
                  })
                  .then(users => {
                    "use strict";

                    const query = [];
                    for (let key in users) {
                      for (let key2 in forums) {
                        query.push({user_id: users[key].id, forum_id: forums[key2].id})
                      }
                    }

                    return Db
                      .tc_user_follow_forums
                      .query()
                      .insert(query)
                  })
                  .then(() => {
                    const query = [];
                    forums.map(forum => {
                      return query.push(
                        Db
                          .tc_forums
                          .query()
                          .increment('follow_count', 1)
                          .where('id', '=', forum.id)
                      )
                    });

                    return new Promise.all(query)
                  })


              })
          } else {
            return Db
              .tc_forums
              .query()
              .where({title: '요청하기'})
              .orWhere({title: '문의하기'})
              .then((forums) => {
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
          }
        })
        .then(() => {
          return Db
            .tc_site_values
            .query()
            .insert([
              {key: 'user', value: 'webmaster@venacle.com', type: 'webmaster-gmail'},
              {key: 'clientId', value: '1070767900930-vju36lhet02f7cugunqke7uo7v961bll.apps.googleusercontent.com', type: 'webmaster-gmail'},
              {key: 'clientSecret', value: 'eLkr5a-NjpP6zokhFhLrh7pK', type: 'webmaster-gmail'},
              {key: 'refreshToken', value: '1/vWQZOO2SyKnZnh0wRCSGvzMoue-QZqE0Io48Uxqbnm8', type: 'webmaster-gmail'},
              {key: 'accessToken', value: 'ya29.Ci91A-kT0DZv2qVu0lzv5zaj-tPq3pePJ-HlJUtamAoFcN1gQIEYxKnDOmIuaHEz3g', type: 'webmaster-gmail'},
            ])
        })
    })
};
