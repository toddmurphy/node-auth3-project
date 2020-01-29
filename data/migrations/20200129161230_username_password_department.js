exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();

    tbl
      .string('username', 255)
      .notNullable()
      .unique();

    tbl.string('password', 128).notNullable();

    tbl.string('department', 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
