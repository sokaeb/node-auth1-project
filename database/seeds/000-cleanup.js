const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: 'truncate', // resets ids back to 1
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
};
