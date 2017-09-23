
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tc_user_roles')
      .where('user_id', '=', 1)
      .update({
        role_id: 2
      })
      .then(() => {
        return knex('tc_user_roles')
            .where('user_id', '<>', 1)
            .update({
              role_id: 1
            })
      })
};
