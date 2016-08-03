// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'venacle_dev',
      user:     'venacle',
      password: 'venacledkbs12',
      host    : '127.0.0.1',
      charset : 'utf8'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'venacle',
      user:     'venacle',
      password: 'venacledkbs12'
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
    client: 'mysql',
    connection: {
      database: 'venacle',
      user:     'venacle',
      password: 'venacledkbs12'
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
