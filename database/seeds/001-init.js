
exports.seed = function(knex) {
  const roles = [
    {
      name: 'admin', // id of 1
    },
    {
      name: 'user', // id of 2
    },
  ];

  return knex('roles').insert(roles)
};
