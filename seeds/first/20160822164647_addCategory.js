const Db = require('../../Models/index');

exports.seed = function (knex, Promise) {
  for (var el in Db) {
    Db[el].knex(knex);
  }

  let categories, forums;

  return knex('tc_forum_categories').del()
    .then(() => knex('tc_categories').del())
    .then(() => knex('tc_user_follow_forums').del())
    .then(function () {

      return Promise.all([
        // Inserts seed entries
        Db.tc_categories.query().insert({title: '뉴스', order: 1, type: 'venacle'}),
        Db.tc_categories.query().insert({title: '패션', order: 2, type: 'venacle'}),
        Db.tc_categories.query().insert({title: '뷰티', order: 3, type: 'venacle'}),
        Db.tc_categories.query().insert({title: '유머', order: 4, type: 'venacle'}),
        Db.tc_categories.query().insert({title: 'Geek', order: 5, type: 'venacle'}),
        Db.tc_categories.query().insert({title: '영화', order: 6, type: 'venacle'}),
        Db.tc_categories.query().insert({title: '게임', order: 7, type: 'venacle'}),
        Db.tc_categories.query().insert({title: '여행', order: 8, type: 'venacle'}),
        Db.tc_categories.query().insert({title: '스포츠', order: 9, type: 'venacle'}),
        Db.tc_categories.query().insert({title: '연예', order: 10, type: 'venacle'}),
        Db.tc_categories.query().insert({title: '자동차', order: 11, type: 'venacle'})
      ])
        .then((cat) => {
          categories = cat;
        })
        .then(() => {
          "use strict";

          return Db
            .tc_users
            .query()
            .where({email: 'bsdo@naver.com'})
            .first()
        })
        .then((user) => Promise.all([
          // 뉴스
          Db.tc_forums.query()
            .where({title: '속보'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '속보',
                  order: 1,
                  sub_header: '최대한 빠른 소식',
                  description: '속보를 모아둔 커뮤니티',
                  creator_id: user.id,
                  rule: '속보에 관련한 사항만 올려주세요',
                  using: true
                })
              }
            }),

          Db.tc_forums.query()
            .where({title: '사회'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '사회',
                  order: 2,
                  sub_header: '사회 소식',
                  description: '사회 소식 게시판',
                  creator_id: user.id,
                  rule: '사회 소식에 관련한 사항만 올려주세요',
                  using: true
                })
              }
            }),

          Db.tc_forums.query()
            .where({title: '정치'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '정치',
                  order: 3,
                  sub_header: '정치계 소식',
                  description: '정치 게시판',
                  creator_id: user.id,
                  rule: '선동, 허위 정보, 비난, 루머등은 금지입니다.',
                  using: true
                })
              }
            }),

          // 패션
          Db.tc_forums.query()
            .where({title: '남자 코디'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '남자 코디',
                  order: 1,
                  sub_header: '남자의 패션',
                  description: '남자들의 코디 정보를 공유하는 게시판 입니다.',
                  creator_id: user.id,
                  rule: '코디 정보를 공유해주세요',
                  using: true
                })
              }
            }),

          Db.tc_forums.query()
            .where({title: '여자 코디'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '여자 코디',
                  order: 2,
                  sub_header: '여자의 패션',
                  description: '여자들의 코디 정보를 공유하는 게시판 입니다.',
                  creator_id: user.id,
                  rule: '코디 정보를 공유해주세요',
                  using: true
                })
              }
            }),

          Db.tc_forums.query()
            .where({title: '헤어스타일'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '헤어스타일',
                  order: 3,
                  sub_header: '유행하는 헤어스타일',
                  description: '헤어스타일을 공유하는 게시판 입니다.',
                  creator_id: user.id,
                  rule: '헤어스타일 정보를 공유해주세요',
                  using: true
                })
              }
            }),

          // 뷰티
          Db.tc_forums.query()
            .where({title: '화장품'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '화장품',
                  order: 1,
                  sub_header: '여자들의 잇템',
                  description: '화장품 공유하는 게시판 입니다.',
                  creator_id: user.id,
                  rule: '화장품 정보나 이벤트 자료등을 공유해주세요',
                  using: true
                })
              }
            }),

          Db.tc_forums.query()
            .where({title: '탈모케어'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '탈모케어',
                  order: 2,
                  sub_header: '탈모를 극복합시다',
                  description: '탈모를 위한 정보 공유 게시판입니다.',
                  creator_id: user.id,
                  rule: '탈모에 관한 정보나 도움이 될만한 글을 울려주세요',
                  using: true
                })
              }
            }),

          // 유머
          Db.tc_forums.query()
            .where({title: '오늘의 유머'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '오늘의 유머',
                  order: 1,
                  sub_header: '웃긴 자료',
                  description: '유머 자료 공유 게시판입니다.',
                  creator_id: user.id,
                  rule: '재미있는 유머 짤방이나 글을 올려주세요',
                  using: true
                })
              }
            }),

          Db.tc_forums.query()
            .where({title: '짤방'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '짤방',
                  order: 2,
                  sub_header: '짤방 자료',
                  description: '짤방 자료 공유 게시판입니다.',
                  creator_id: user.id,
                  rule: '재미있는 유머 짤방이나 글을 올려주세요',
                  using: true
                })
              }
            }),

          //Geek
          Db.tc_forums.query()
            .where({title: 'Geek'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: 'Geek',
                  order: 1,
                  sub_header: 'Geek한 자료',
                  description: 'Geek 짤방 자료 공유 게시판입니다.',
                  creator_id: user.id,
                  rule: 'Geek에 관한 모든 자료는 상관 없음',
                  using: true
                })
              }
            }),

          Db.tc_forums.query()
            .where({title: '코딩'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '코딩',
                  order: 1,
                  sub_header: '개발자들은 공유를 합니다',
                  description: '나는 왜 안되지??',
                  creator_id: user.id,
                  rule: '밤새기 싫으면 글을 올립니다',
                  using: true
                })
              }
            }),

          //영화
          Db.tc_forums.query()
            .where({title: '영화'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '영화',
                  order: 1,
                  sub_header: '나는 영화 메니아',
                  description: '영화에 관련된 자료들',
                  creator_id: user.id,
                  rule: '영화에 관련된 포스팅, 리뷰, 이벤트, 정보, 배우 소식등을 올립니다',
                  using: true
                })
              }
            }),

          Db.tc_forums.query()
            .where({title: '영화 리뷰'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '영화 리뷰',
                  order: 1,
                  sub_header: '나는 영화 리뷰어',
                  description: '영화 리뷰에 관한 정보 공유',
                  creator_id: user.id,
                  rule: '보고 난 영화를 리뷰 합니다. 꼭 제목에 스포 유무를 적어주세요',
                  using: true
                })
              }
            }),

          // 게임
          Db.tc_forums.query()
            .where({title: '오버워치'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '오버워치',
                  order: 1,
                  sub_header: '새로운 영웅은 언제나 환영이야',
                  description: '오버워치에 관한 정보공유',
                  creator_id: user.id,
                  rule: '핵 판매 유도 = 벤',
                  using: true
                })
              }
            }),
          Db.tc_forums.query()
            .where({title: '롤'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '롤',
                  order: 2,
                  sub_header: '소환사에 협곡에 오신것을 환영합니다.',
                  description: '롤 정보 공유',
                  creator_id: user.id,
                  rule: '대리랭 사절',
                  using: true
                })
              }
            }),
          Db.tc_forums.query()
            .where({title: '비디오 게임'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '비디오 게임',
                  order: 3,
                  sub_header: 'PS4, XBOX, Wii, 3DS',
                  description: '비디오 게임 정보 공유합니다',
                  creator_id: user.id,
                  rule: '비디오 게임 정보를 공유해주세요',
                  using: true
                })
              }
            }),

          // 여행
          Db.tc_forums.query()
            .where({title: '여행'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '여행',
                  order: 1,
                  sub_header: '나를 찾아서..',
                  description: '여행의 진정한 행복을 공유합니다',
                  creator_id: user.id,
                  rule: '여행지 소식, 여행 계획, 사진, 루트, 경비, 호텔 정보, 현지 소식등을 공유합니다',
                  using: true
                })
              }
            }),
          Db.tc_forums.query()
            .where({title: '국내여행'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '국내여행',
                  order: 2,
                  sub_header: '국내 여행에 관한 자료',
                  description: '국내 여행의 진미',
                  creator_id: user.id,
                  rule: '여행지 소식, 여행 계획, 사진, 루트, 경비, 호텔 정보, 현지 소식등을 공유합니다',
                  using: true
                })
              }
            }),
          Db.tc_forums.query()
            .where({title: '해외여행'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '해외여행',
                  order: 3,
                  sub_header: '해외 여행에 관한 자료',
                  description: '해외 여행의 진미',
                  creator_id: user.id,
                  rule: '여행지 소식, 여행 계획, 사진, 루트, 경비, 호텔 정보, 현지 소식등을 공유합니다',
                  using: true
                })
              }
            }),
          Db.tc_forums.query()
            .where({title: '내일로'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '내일로',
                  order: 4,
                  sub_header: '내일로에 관한 자료',
                  description: '내일로의 진미',
                  creator_id: user.id,
                  rule: '여행지 소식, 여행 계획, 사진, 루트, 경비, 호텔 정보, 현지 소식등을 공유합니다',
                  using: true
                })
              }
            }),

          // 스포츠
          Db.tc_forums.query()
            .where({title: '프로야구'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '프로야구',
                  order: 1,
                  sub_header: '야구는 사랑',
                  description: '프로야구에 관한 자료를 공유합니다',
                  creator_id: user.id,
                  rule: '야구장 소식, 팀 응원, 사진, 현지 소식등을 공유합니다. 프로야구에 관한 정보를 공유합니다.',
                  using: true
                })
              }
            }),
          Db.tc_forums.query()
            .where({title: 'MLB'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: 'MLB',
                  order: 2,
                  sub_header: '야구는 사랑',
                  description: 'MLB에 관한 자료를 공유합니다',
                  creator_id: user.id,
                  rule: '야구장 소식, 팀 응원, 사진, 현지 소식등을 공유합니다. MLB에 관한 정보를 공유합니다.',
                  using: true
                })
              }
            }),
          Db.tc_forums.query()
            .where({title: '국내축구'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '국내축구',
                  order: 3,
                  sub_header: '축구는 사랑',
                  description: '국내축구에 관한 자료를 공유합니다',
                  creator_id: user.id,
                  rule: '축구장 소식, 팀 응원, 사진, 현지 소식등을 공유합니다. 국내축구에 관한 정보를 공유합니다.',
                  using: true
                })
              }
            }),
          Db.tc_forums.query()
            .where({title: '해외축구'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '해외축구',
                  order: 4,
                  sub_header: '축구는 사랑',
                  description: '해외축구에 관한 자료를 공유합니다',
                  creator_id: user.id,
                  rule: '축구장 소식, 팀 응원, 사진, 현지 소식등을 공유합니다. 해외축구에 관한 정보를 공유합니다.',
                  using: true
                })
              }
            }),

          // 연예
          Db.tc_forums.query()
            .where({title: '연예계'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '연예계',
                  order: 1,
                  sub_header: '연예가 중계',
                  description: '연예계 소식을 공유합니다',
                  creator_id: user.id,
                  rule: '연예계 소식, 사진, 뉴스등을 공유합니다. 연예계에 관한 정보를 공유합니다.',
                  using: true
                })
              }
            }),
          Db.tc_forums.query()
            .where({title: '가수'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '가수',
                  order: 2,
                  sub_header: '현재 가수들의 소식',
                  description: '가수 소식을 공유합니다',
                  creator_id: user.id,
                  rule: '가수 소식, 사진, 뉴스등을 공유합니다. 가수에 관한 정보를 공유합니다.',
                  using: true
                })
              }
            }),
          Db.tc_forums.query()
            .where({title: '배우'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '배우',
                  order: 3,
                  sub_header: '연예가 중계',
                  description: '배우 소식을 공유합니다',
                  creator_id: user.id,
                  rule: '배우 소식, 사진, 뉴스등을 공유합니다. 배우에 관한 정보를 공유합니다.',
                  using: true
                })
              }
            }),

          // 자동차
          Db.tc_forums.query()
            .where({title: '자동차'})
            .first()
            .then(forum => {
              if (forum) {
                return forum;
              } else {
                return Db.tc_forums.query().insert({
                  title: '자동차',
                  order: 1,
                  sub_header: '질주 본능',
                  description: '자동차 소식을 공유합니다.',
                  creator_id: user.id,
                  rule: '나의 애마, 시세, 드림카 소식, 정비, 네비게이션, 블랙박스, 정보, 모든 차량에 관한 정보를 공유합니다.',
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
              {category_id: categories[0].id, forum_id: f[0].id},
              {category_id: categories[0].id, forum_id: f[1].id},
              {category_id: categories[0].id, forum_id: f[2].id},
              {category_id: categories[1].id, forum_id: f[3].id},
              {category_id: categories[1].id, forum_id: f[4].id},
              {category_id: categories[1].id, forum_id: f[5].id},
              {category_id: categories[2].id, forum_id: f[6].id},
              {category_id: categories[2].id, forum_id: f[7].id},
              {category_id: categories[3].id, forum_id: f[8].id},
              {category_id: categories[3].id, forum_id: f[9].id},
              {category_id: categories[4].id, forum_id: f[10].id},
              {category_id: categories[4].id, forum_id: f[11].id},
              {category_id: categories[5].id, forum_id: f[12].id},
              {category_id: categories[5].id, forum_id: f[13].id},
              {category_id: categories[6].id, forum_id: f[14].id},
              {category_id: categories[6].id, forum_id: f[15].id},
              {category_id: categories[6].id, forum_id: f[16].id},
              {category_id: categories[7].id, forum_id: f[17].id},
              {category_id: categories[7].id, forum_id: f[18].id},
              {category_id: categories[7].id, forum_id: f[19].id},
              {category_id: categories[7].id, forum_id: f[20].id},
              {category_id: categories[8].id, forum_id: f[21].id},
              {category_id: categories[8].id, forum_id: f[22].id},
              {category_id: categories[8].id, forum_id: f[23].id},
              {category_id: categories[8].id, forum_id: f[24].id},
              {category_id: categories[9].id, forum_id: f[25].id},
              {category_id: categories[9].id, forum_id: f[26].id},
              {category_id: categories[9].id, forum_id: f[27].id},
              {category_id: categories[10].id, forum_id: f[28].id},
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
    });
};
