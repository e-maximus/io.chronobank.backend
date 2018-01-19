module.exports = {
  apps: [
    {
      name: 'io.chronobank.backend',
      script: 'keystone.js',
      watch: true,
      env: {
        'PORT': 3000,
        'NODE_ENV': 'development'
      },
      env_production: {
        'PORT': 3010,
        'NODE_ENV': 'production'
      }
    }
  ]
}
