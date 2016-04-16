// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'trendclear_dev',
      user:     'trendclear',
      password: 'trendclear'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'trendclear',
      user:     'trendclear',
      password: 'trendclear'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'trendclear_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'trendclear',
      user:     'trendclear',
      password: 'trendclear'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'trendclear_migrations'
    }
  }

};
