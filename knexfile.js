// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'venacle_dev',
      user:     'venacle',
      password: 'venacle',
      host    : '127.0.0.1',
      charset : 'utf8'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'venacle',
      user:     'venacle',
      password: 'venacle'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'venacle_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'venacle',
      user:     'venacle',
      password: 'venacle'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'venacle_migrations'
    }
  }

};
