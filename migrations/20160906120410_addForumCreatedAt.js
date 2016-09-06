
exports.up = function(knex, Promise) {
  return knex.schema
  // 기존 테이블 변경 (삭제)
    .table('tc_forums', function (table) {
      table.timestamp('created_at');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
  // 기존 테이블 변경 (삭제)
    .table('tc_forums', function (table) {
      table.dropColumn('created_at');
    })
};
