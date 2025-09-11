module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert'
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'web',
        'mobile',
        'api',
        'db',
        'ui',
        'utils',
        'types',
        'auth',
        'feed',
        'news',
        'gigs',
        'playlists',
        'creative',
        'admin',
        'ci',
        'deps'
      ]
    ]
  }
};