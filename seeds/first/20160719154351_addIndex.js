'use strict';
const _ = require('lodash');
const shortId = require('shortid');
const bcrypt = require('bcrypt');

let M = require('../../Models/index');

exports.seed = function(knex, Promise) {
  for (var el in M) {
    M[el].knex(knex);
  }
  
  let admin;

  return Promise.join(
    // Deletes ALL existing entries

    knex('tc_user_skills').del(),
    knex('tc_skill_requires').del(),
    knex('tc_skill_properties').del(),
    knex('tc_skills').del(),

    knex('tc_user_like_logs').del(),
    knex('tc_likes').del(),

    knex('tc_sub_comments').del(),
    knex('tc_comments').del(),

    knex('tc_post_has_tags').del(),
    knex('tc_tags').del(),
    
    knex('tc_post_views').del(),
    knex('tc_posts').del(),

    knex('tc_forum_prefixes').del(),
    knex('tc_forums').del(),
    knex('tc_club_categories').del(),
    knex('tc_club_category_groups').del(),
    knex('tc_clubs').del(),

    knex('tc_user_having_icons').del(),
    knex('tc_user_roles').del(),
    knex('tc_user_grades').del(),

    knex('tc_icons').del(),
    knex('tc_roles').del(),
    knex('tc_grades').del(),

    knex('tc_user_passwords').del(),
    knex('tc_user_profiles').del(),
    knex('tc_user_trendboxes').del(),

    knex('tc_users').del()
  )
    .then(function () {
      return ([
        knex.batchInsert('tc_roles', [
          {name: '회원'},
          {name: '개발자'}
        ]),

        // Inserts seed entries
        knex.batchInsert('tc_grades', [
          {name: '없음'},
          {name: '브론즈', img: 'grade_bronze.png'},
          {name: '실버', img: 'grade_silver.png'},
          {name: '골드', img: 'grade_gold.png'},
          {name: '플레티넘', img: 'grade_plat.png'},
          {name: '다이아몬드', img: 'grade_dia.png'}
        ]),

        M.tc_icons.query().insert({
          icon_img: 'icon_1.png', type: 'default', created_at: new Date()
        }),

        // Inserts seed entries
        M.tc_users.query().insertWithRelated({
          email: 'bsdo@naver.com',
          nick: 'nick1',
          uid: shortId.generate(),
          password: {
            password: bcrypt.hashSync('dkbs12', 10)
          },
          profile: {
            sex: 1,
            birth: new Date(),
            joined_at: new Date()
          },
          trendbox: {
            level: 1
          },
        }).first(),

        knex.batchInsert('tc_skills', [
          {title: '글쓰기', name: 'write_post', img: 'skill_0.jpg', description: '새로운 글을 등록할 수 있습니다.'},
          {title: '댓글쓰기', name: 'write_comment', img: 'skill_1.jpg', description: '새로운 댓글을 등록 할 수 있습니다.'},
          {title: '대댓글쓰기', name: 'write_sub_comment', img: 'skill_2.jpg', description: '새로운 대댓글을 달 수 있습니다.'},
        ])
      ])
    })
    .spread(function (roles, grades, icons, user, skills) {
      admin = user;
      let role = _.find(roles, {name: '개발자'});
      let grade = _.find(grades, {name: '없음'});
      let icon = _.find(icons, {type: 'default'});
      
      return user
        .$relatedQuery('grade')
        .insert({grade_id: grade.id})
        .then(function () {
          return user
            .$relatedQuery('role')
            .insert({role_id: role.id})
        })
        .then(function () {
          return user
            .$relatedQuery('icon')
            .insert({icon_id: icon.id, keeping_at: new Date()})
        })
        .then(function() {
          return knex.batchInsert('tc_user_skills', [
            {level: 1, skill_id: skills[0].id, user_id: user.id},
            {level: 1, skill_id: skills[1].id, user_id: user.id},
            {level: 1, skill_id: skills[2].id, user_id: user.id},
          ])
        })
        .then(function() {
          let queryArray = [];
          for (let index in skills) {
            queryArray.push(
              skills[index]
                .$relatedQuery('property')
                .insert({
                  leveling: false,
                  cooltime: 10
                })
            )
          }

          return (queryArray)
        })
        .spread(function() {
          return true;
        })
    })
    .then(function() {
      return M.tc_clubs.query().insertWithRelated([
          { '#id': 'club1', title: '바디/헤어', order: 0, using: 1, description: '바디/헤어', category_groups: [
            { '#id': 'cg1', title: '헤어', order: 0, using: 1, description: '헤어', club_id: '#ref{club1.id}', categories: [
              { '#id': 'c1', title: '헤어케어', order: 0, using: 1, description: '헤어케어', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg1.id}', forums: [
                { title: '샴푸1/린스', order: 0, using: 1, description: '샴푸/린스', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg1.id}', category_id: '#ref{c1.id}', prefixes: [
                  { name: '기능성 샴푸' },
                  { name: '한방 샴푸' }
                ] },
                { title: '트리트먼트/에센스', order: 1, using: 1, description: '트리트먼스/에센스', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg1.id}', category_id: '#ref{c1.id}',  },
                { title: '탈모', order: 2, using: 1, description: '탈모', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg1.id}', category_id: '#ref{c1.id}' }
              ]},
              { '#id': 'c2', title: '헤어스타일링', order: 1, using: 1, description: '헤어스타일링', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg1.id}', forums: [
                { title: '스타일링', order: 0, using: 1, description: '스타일링', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg1.id}', category_id: '#ref{c2.id}' },
                { title: '염색', order: 1, using: 1, description: '염색', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg1.id}', category_id: '#ref{c2.id}' },
                { title: '파마', order: 2, using: 1, description: '파마', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg1.id}', category_id: '#ref{c2.id}' }
              ]}
            ]},
            { '#id': 'cg3', title: '헤어', order: 0, using: 1, description: '헤어', club_id: '#ref{club1.id}', categories: [
              { '#id': 'c5', title: '헤어케어', order: 0, using: 1, description: '헤어케어', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg3.id}', forums: [
                { title: '샴푸1/린스', order: 0, using: 1, description: '샴푸/린스', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg3.id}', category_id: '#ref{c5.id}', prefixes: [
                  { name: '기능성 샴푸' },
                  { name: '한방 샴푸' }
                ] },
                { title: '트리트먼트/에센스', order: 1, using: 1, description: '트리트먼스/에센스', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg3.id}', category_id: '#ref{c5.id}',  },
                { title: '탈모', order: 2, using: 1, description: '탈모', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg3.id}', category_id: '#ref{c5.id}' }
              ]},
              { '#id': 'c6', title: '헤어스타일링', order: 1, using: 1, description: '헤어스타일링', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg3.id}', forums: [
                { title: '스타일링', order: 0, using: 1, description: '스타일링', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg3.id}', category_id: '#ref{c6.id}' },
                { title: '염색', order: 1, using: 1, description: '염색', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg3.id}', category_id: '#ref{c6.id}' },
                { title: '파마', order: 2, using: 1, description: '파마', club_id: '#ref{club1.id}', club_category_group_id: '#ref{cg3.id}', category_id: '#ref{c6.id}' }
              ]}
            ]}
          ]},
          { '#id': 'club2', title: '음악', order: 0, using: 1, description: '음악', category_groups: [
            { '#id': 'cg2', title: '장르', order: 0, using: 1, description: '헤어', club_id: '#ref{club2.id}', categories: [
              { '#id': 'c3', title: '인디', order: 0, using: 1, description: '헤어케어', club_id: '#ref{club2.id}', club_category_group_id: '#ref{cg2.id}', forums: [
                { title: '새로운 음악', order: 0, using: 1, description: '샴푸/린스', club_id: '#ref{club2.id}', club_category_group_id: '#ref{cg2.id}', category_id: '#ref{c3.id}', prefixes: [
                  { name: '기능성 샴푸' },
                  { name: '한방 샴푸' }
                ] },
                { title: '추천 밴드', order: 1, using: 1, description: '트리트먼스/에센스', club_id: '#ref{club2.id}', club_category_group_id: '#ref{cg2.id}', category_id: '#ref{c3.id}',  },
                { title: '지역 모임', order: 2, using: 1, description: '탈모', club_id: '#ref{club2.id}', club_category_group_id: '#ref{cg2.id}', category_id: '#ref{c3.id}' }
              ]},
              { '#id': 'c4', title: '가요', order: 1, using: 1, description: '헤어스타일링', club_id: '#ref{club2.id}', club_category_group_id: '#ref{cg2.id}', forums: [
                { title: 'K-POP', order: 0, using: 1, description: '스타일링', club_id: '#ref{club2.id}', club_category_group_id: '#ref{cg2.id}', category_id: '#ref{c4.id}' },
                { title: 'R&B', order: 1, using: 1, description: '염색', club_id: '#ref{club2.id}', club_category_group_id: '#ref{cg2.id}', category_id: '#ref{c4.id}' },
                { title: '나가수', order: 2, using: 1, description: '파마', club_id: '#ref{club2.id}', club_category_group_id: '#ref{cg2.id}', category_id: '#ref{c4.id}' }
              ]}
            ]}
          ]}
        ])
    })
    .then(function() {
      return [
        M
          .tc_users
          .query()
          .where({nick: 'nick1'})
          .first(),
        M
          .tc_forums
          .query()
          .eager('[category.category_group.club]')
          .where({title: '샴푸1/린스'})
          .first(),
        knex
          .batchInsert('tc_tags', [
            {name: 'Hello'},
            {name: 'world'},
            {name: 'this'}
          ]),
        M
          .tc_forum_prefixes
          .query()
          .select('id')
          .where({name: '한방 샴푸'})
          .first()
        ]
    })
    .spread(function (user, forum, tags, prefix) {
      console.log(user);
      console.log(forum);
      console.log(tags);

      let p;
      return M
        .tc_posts
        .query()
        .insert({
          title: 'Hello',
          content: 'world',
          created_at: new Date(),
          updated_at: new Date(),
          author_id: user.id,
          club_id: forum.category.category_group.club.id,
          category_group_id: forum.category.category_group.id,
          category_id: forum.category.id,
          forum_id: forum.id,
          prefix_id: prefix.id
        })
        .then(function (post) {
          p = post;
          return knex
            .batchInsert('tc_post_has_tags', [
              {tag_id: tags[0].id, post_id: post.id},
              {tag_id: tags[1].id, post_id: post.id},
              {tag_id: tags[2].id, post_id: post.id}
            ])
        })
        .then(function (tags) {
          console.log(tags); // --> true
          return M
            .tc_posts
            .query()
            .eager('[tags]')
        })
        .then(function (post) {
          console.dir(post, {depth: 10});
          return M
            .tc_users
            .query()
            .eager('[grade, role, icon, password]')
            .first()
        })
        .then(function (user) {
          console.dir(user, {depth: 10});
          return M
            .tc_clubs
            .query()
            .eager('[category_groups]')
        })
        .then(function (group) {
          console.dir(group, {depth: 10});
          return M
            .tc_club_categories
            .query()
            .eager('category_group.club')
            .first()
        })
        .then(function (category) {
          console.dir(category, {depth: 10});
          return M
            .tc_posts
            .query()
            .offset(0)
            .limit(10)
            .eager('[prefix, author.[icon,profile], forum.category.category_group.club, tags]')
            .filterEager('forum', builder => builder.select(['id', 'title', 'category_id']))
            .filterEager('forum.category', builder => builder.select(['id', 'title', 'club_category_group_id']))
            .filterEager('forum.category.category_group', builder => builder.select(['id', 'title', 'club_id']))
            .filterEager('forum.category.category_group.club', builder => builder.select('id', 'title'))
          
        })
        .then(function (posts) {
          console.dir(posts, {depth: 10});
          return M
            .tc_posts
            .query()
            .select(knex.raw(`COUNT(*) as total`))
            .where(knex.raw(`deleted = '0'`))
        })
        .then(function (counts) {
          console.dir(counts, {depth: 10});
          return M
            .tc_club_categories
            .query()
            .where({title: '헤어케어'})
            .first()
        })
        .then(function (category) {
          return M
            .tc_club_categories
            .query()
            .select(
              knex.raw(`"tc_club_categories"."id" as "category_id"`),
              knex.raw(`"tc_club_category_groups"."id" as "category_group_id"`),
              knex.raw(`"tc_clubs"."id" as "club_id"`)
            )
            .join('tc_club_category_groups', 'tc_club_categories.club_category_group_id', '=', 'tc_club_category_groups.id')
            .join('tc_clubs', 'tc_club_category_groups.club_id', '=', 'tc_clubs.id')
            .where('tc_club_categories.id', category.id)
            .first()
        })
        .then(function (clubs) {
          console.dir(clubs, {depth: 10});
          return M
            .tc_clubs
            .query()
            .eager('[category_groups.categories.forums]')
            .where({id: clubs.club_id})
            .first()
        })
        .then(function (clubs) {
          console.dir(clubs, {depth: 10});
          return M
            .tc_posts
            .query()
            .eager('[author.[profile, grade, icon.iconDef], prefix, tags, forum.[category.category_group.club]]')
            .debug()
        })
        .then(function (posts) {
          console.dir(posts, {depth: 10});
          return p
            .$relatedQuery('comments')
            .insert({
              content: 'Fluffy world!',
              author_id: user.id,
              created_at: new Date()
            })
            .then(function (comment) {
              return p
                .$query()
                .increment('comment_count', 1)
                .then(function () {
                  return comment
                })
            })
        })
        .then(function (comment) {
          console.dir(comment, {depth: 10}); // --> true
          return comment
            .$relatedQuery('subComments')
            .insert({
              content: 'Fluffy sub comments!',
              author_id: user.id,
              created_at: new Date()
            })
            .then(function (sub_comment) {
              return comment
                .$query()
                .increment('sub_comment_count', 1)
                .then(function () {
                  return sub_comment
                })
            })
        })
        .then(function (subcomment) {
          console.dir(subcomment, {depth: 10}); // --> true
          return p
            .$query()
            .eager('[comments.[subComments.author, author]]')
        })
        .then(function (post) {
          console.dir(post, {depth: 10}); // --> true

        })
    })
};