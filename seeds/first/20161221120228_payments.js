const Db = require('../../Models/index');
const shortId = require('shortid');
const co = require('co');

exports.seed = function(knex, Promise) {
  for (let el in Db) {
    if (Db.hasOwnProperty(el)) {
      Db[el].knex(knex);
    }
  }

  return knex('tc_payments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        Db.tc_payments.query().insert({

          amount: 10000,
          apply_num: '10873540',
          buyer_addr: null,
          buyer_email: 'bsdo64@gmail.com',
          buyer_name: 'nick3',
          buyer_postcode: null,
          buyer_tel: null,
          cancel_amount: 10000,
          cancel_reason: '[아임포트] 관리자페이지취소',
          cancel_receipt_urls: JSON.stringify([
            'https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDINIpayTest20161220190436640547&noMethod=1'
          ]),
          cancelled_at: new Date(1482228876000),
          card_name: '외환카드',
          card_quota: 0,
          currency: 'KRW',
          custom_data: null,
          escrow: false,
          fail_reason: null,
          failed_at: new Date(0),
          imp_uid: 'imp_344334433278',
          merchant_uid: 'venacle_rp_1482228224828',
          name: 'RP 충전',
          paid_at: new Date(1482228277000),
          pay_method: 'card',
          pg_provider: 'html5_inicis',
          pg_tid: 'StdpayCARDINIpayTest20161220190436640547',
          receipt_url: 'https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDINIpayTest20161220190436640547&noMethod=1',
          status: 'cancelled',
          vbank_date: new Date(0),
          vbank_holder: null,
          vbank_name: null,
          vbank_num: null

        }),
      ]);
    });
};
