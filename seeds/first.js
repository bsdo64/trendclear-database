'use strict';
const _ = require('lodash');
const shortId = require('shortid');
const bcrypt = require('bcrypt');

let M = require('../Models/index');

exports.seed = function(knex, Promise) {
  for (var el in M) {
    M[el].knex(knex);
  }
  
  let admin;

  return Promise.join(
    // Deletes ALL existing entries

    knex('tc_post_has_tags').del(),
    knex('tc_tags').del(),
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
        M.tc_roles.query().insert([
          {name: '회원'},
          {name: '개발자'}
        ]),

        // Inserts seed entries
        M.tc_grades.query().insert([
          {name: '없음'},
          {name: '브론즈'},
          {name: '실버'},
          {name: '골드'},
          {name: '플레티넘'},
          {name: '다이아몬드'}
        ]),

        M.tc_icons.query().insert([
          {icon_img: 'icon_1.png', type: 'default', created_at: new Date()}
        ]),

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
        }).first()
      ])
    })
    .spread(function (roles, grades, icons, user) {
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
        });
    })
    .then(function() {
      return M.tc_clubs.query().insertWithRelated([
          { title: '바디/헤어', order: 0, using: 1, description: '바디/헤어', category_groups: [
            { title: '헤어', order: 0, using: 1, description: '헤어', categories: [
              { title: '헤어케어', order: 0, using: 1, description: '헤어케어', forums: [
                { title: '샴푸1/린스', order: 0, using: 1, description: '샴푸/린스', prefixes: [
                  { name: '기능성 샴푸' },
                  { name: '한방 샴푸' }
                ] },
                { title: '트리트먼트/에센스', order: 1, using: 1, description: '트리트먼스/에센스' },
                { title: '탈모', order: 2, using: 1, description: '탈모' }
              ]},
              { title: '헤어스타일링', order: 1, using: 1, description: '헤어스타일링', forums: [
                { title: '스타일링', order: 0, using: 1, description: '스타일링' },
                { title: '염색', order: 1, using: 1, description: '염색' },
                { title: '파마', order: 2, using: 1, description: '파마' }
              ]}
            ]},
            { title: '바디', order: 1, using: 1, description: '바디', categories: [
              { title: '바디케어', order: 0, using: 1, description: '바디케어', forums: [
                { title: '바디워시', order: 0, using: 1, description: '바디워시' },
                { title: '청결제', order: 1, using: 1, description: '청결제' },
                { title: '입욕제', order: 2, using: 1, description: '입욕제' },
                { title: '제모용품', order: 3, using: 1, description: '제모용품' },
                { title: '데오드란트', order: 4, using: 1, description: '데오드란트' },
                { title: '태닝용품', order: 5, using: 1, description: '태닝용품' }
              ]},
              { title: '바디로션/핸드크림', order: 1, using: 1, description: '바디로션/핸드크림', forums: [
                { title: '바디로션', order: 0, using: 1, description: '바디로션' },
                { title: '핸드풋케어', order: 1, using: 1, description: '핸드풋케어' },
                { title: '립케어', order: 2, using: 1, description: '립케어' }
              ]},
              { title: '세면', order: 2, using: 1, description: '세면', forums: [
                { title: '면도용품', order: 0, using: 1, description: '면도' },
                { title: '칫솔', order: 1, using: 1, description: '칫솔' },
                { title: '비누', order: 2, using: 1, description: '비누' }
              ]}
            ]}
          ]},
          { title: '탈모', order: 0, using: 1, description: '탈모', category_groups: [
            { title: '헤어', order: 0, using: 1, description: '헤어', categories: [
              { title: '탈모케어', order: 0, using: 1, description: '헤어케어', forums: [
                { title: '샴푸/린스', order: 0, using: 1, description: '샴푸/린스', prefixes: [
                  { name: '기능성 샴푸' },
                  { name: '한방 샴푸' }
                ] },
                { title: '트리트먼트/에센스', order: 1, using: 1, description: '트리트먼스/에센스' },
                { title: '탈모', order: 2, using: 1, description: '탈모' }
              ]},
              { title: '헤어스타일링', order: 1, using: 1, description: '헤어스타일링', forums: [
                { title: '스타일링', order: 0, using: 1, description: '스타일링' },
                { title: '염색', order: 1, using: 1, description: '염색' },
                { title: '파마', order: 2, using: 1, description: '파마' }
              ]}
            ]},
            { title: '가발', order: 1, using: 1, description: '바디', categories: [
              { title: '탈모영양제', order: 0, using: 1, description: '바디케어', forums: [
                { title: '바디워시', order: 0, using: 1, description: '바디워시' },
                { title: '청결제', order: 1, using: 1, description: '청결제' },
                { title: '입욕제', order: 2, using: 1, description: '입욕제' },
                { title: '제모용품', order: 3, using: 1, description: '제모용품' },
                { title: '데오드란트', order: 4, using: 1, description: '데오드란트' },
                { title: '태닝용품', order: 5, using: 1, description: '태닝용품' }
              ]},
              { title: '바디로션/핸드크림', order: 1, using: 1, description: '바디로션/핸드크림', forums: [
                { title: '바디로션', order: 0, using: 1, description: '바디로션' },
                { title: '핸드풋케어', order: 1, using: 1, description: '핸드풋케어' },
                { title: '립케어', order: 2, using: 1, description: '립케어' }
              ]},
              { title: '세면', order: 2, using: 1, description: '세면', forums: [
                { title: '면도용품', order: 0, using: 1, description: '면도' },
                { title: '칫솔', order: 1, using: 1, description: '칫솔' },
                { title: '비누', order: 2, using: 1, description: '비누' }
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
          .where({title: '샴푸1/린스'})
          .first(),
        M
          .tc_tags
          .query()
          .insert([
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
      return M
        .tc_posts
        .query()
        .insert({
          title: 'Hello',
          content: 'world',
          created_at: new Date(),
          updated_at: new Date(),
          author_id: user.id,
          forum_id: forum.id,
          prefix_id: prefix.id
        })
        .then(function (post) {
          return post
            .$relatedQuery('tags')
            .relate([
              tags[0].id,
              tags[1].id,
              tags[2].id,
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
            .eager('[category_group.club, forums]')
            .where({id: 571})
            .first()
        })
        .then(function (categories) {
          console.dir(categories, {depth: 10});
        })
    })
};