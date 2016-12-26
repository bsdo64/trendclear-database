exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('tc_payments', function (table) {
      table.increments('id').primary();
      table.string('merchant_uid'); //가맹점에서 전달한 거래 고유 UID
      table.integer('amount'); //주문(결제)금액
      table.string('apply_num'); //카드사 승인정보(계좌이체/가상계좌는 값 없음) ,
      table.string('buyer_addr'); //주문자 주소
      table.string('buyer_email'); //주문자 Email
      table.string('buyer_name'); //주문자 이름
      table.string('buyer_postcode'); //주문자 우편번호
      table.string('buyer_tel'); //주문자 연락처
      table.integer('cancel_amount'); //결제취소금액
      table.string('cancel_reason'); //결제취소 사유
      table.timestamp('cancelled_at'); //결제취소시점 UNIX timestamp. 결제취소가 아닐 경우 0 ,
      table.string('card_name'); //카드사 명칭 ,
      table.integer('card_quota'); //할부개월 수(0이면 일시불) ,
      table.string('currency'); //결제승인화폐단위(KRW:원, USD:미화달러, EUR:유로) ,
      table.json('custom_data'); //가맹점 임의 지정 데이터
      table.json('cancel_receipt_urls'); //가맹점 임의 지정 데이터
      table.boolean('escrow'); //에스크로결제 여부
      table.string('fail_reason'); //결제실패 사유
      table.timestamp('failed_at'); //결제실패시점 UNIX timestamp. 결제실패가 아닐 경우 0 ,
      table.string('imp_uid'); //아임포트 결제 고유 UID
      table.string('name'); //주문명
      table.timestamp('paid_at'); //결제승인시각
      table.string('pay_method'); //samsung : 삼성페이 / card : 신용카드 / trans : 계좌이체 / vbank : 가상계좌 ,
      table.string('pg_provider'); //결제승인/시도된 PG사
      table.string('pg_tid'); //PG사 거래고유번호
      table.string('receipt_url'); //PG사에서 발행되는 거래 매출전표 URL
      table.string('status'); //결제상태
      table.timestamp('vbank_date'); //가상계좌 입금기한
      table.string('vbank_holder'); //가상계좌 예금주
      table.string('vbank_name'); //가상계좌 은행명
      table.string('vbank_num'); //가상계좌 입금계좌번호
    })
    .createTable('tc_payment_notis', function (table) {
      table.increments('id').primary();
      table.string('merchant_uid');
      table.string('imp_uid');
      table.string('status');
    })

};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('tc_payments')
    .dropTableIfExists('tc_payment_notis')

};
