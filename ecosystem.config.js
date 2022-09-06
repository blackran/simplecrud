module.exports = {
  apps: [
    {
      name: 'medicocrud',
      script: 'npm',
      args: 'start',
      watch: 'src',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],

  deploy: {
    prod: {
      user: 'debian',
      host: '51.178.45.126',
      ref: 'origin/prod',
      repo: 'git@gitlab.com:web437/simple-crud/backend.git',
      path: '/home/debian/medicocrud.wedevin.fr/backend/',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --only medicocrud && pm2 save',
      'pre-setup': '',
    },
  },
};
