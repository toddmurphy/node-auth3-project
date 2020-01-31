// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: process.env.PASSWORD,
      database: 'auth3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: process.env.TESTING,
      database: 'auth3_testing'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
