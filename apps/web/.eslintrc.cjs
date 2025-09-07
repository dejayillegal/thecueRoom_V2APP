module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'prettier'],
  overrides: [
    {
      files: ['app/page.tsx', 'components/auth/TOTPSetup.tsx', 'components/auth/UserMenu.tsx'],
      rules: { '@next/next/no-img-element': 'off' }
    }
  ]
};
