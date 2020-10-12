
exports.seed = function(knex) {
  return knex('users').insert([
      { username: "", password: "" },
      { username: "", password: "" },
      { username: "", password: "" },
  ]);
};