const Db = require('../Models/index');
const shortId = require('shortid');

exports.seed = function(knex, Promise) {
  for (var el in Db) {
    Db[el].knex(knex);
  }

  return Promise.join(
    // Deletes ALL existing entries

    knex('tc_item_attributes').del(),
    knex('tc_items').del()
  )
    .then(function () {

      return Promise.all([
        // Inserts seed entries
        Db.tc_items.query().insertWithRelated({
          code: shortId.generate(),
          title: '베나링크 활성화',
          image: '/images/venacle-item1-venalink.png',
          attribute: {
            item_type: 'venalink',
            purpose: 'posting',
            description: '자신의 글에 베나링크를 활성화 합니다',
            available_level: 1,
            cooltime_sec: 10,
            price_type: 'T',
            price_t: 10,
            created_at: new Date()
          }
        }),
        Db.tc_items.query().insertWithRelated({
          code: shortId.generate(),
          title: '커뮤니티 만들기',
          image: '/images/venacle-item3-create-community.png',
          attribute: {
            item_type: 'create_community',
            purpose: 'community',
            description: '커뮤니티 게시판을 생성할 수 있습니다',
            available_level: 1,
            cooltime_sec: 10,
            price_type: 'T',
            price_t: 100,
            created_at: new Date()
          }
        }),
        Db.tc_items.query().insertWithRelated({
          code: shortId.generate(),
          title: '베나링크 참여권',
          image: '/images/venacle-item3-create-community.png',
          attribute: {
            item_type: 'create_community',
            purpose: 'community',
            description: '활성화 된 베나링크에 참여 할 수 있습니다',
            available_level: 1,
            cooltime_sec: 10,
            price_type: 'T',
            price_t: 20,
            created_at: new Date()
          }
        }),
      ]);
    });
  // Deletes ALL existing entries
};
