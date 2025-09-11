module.exports = {
  root: true,
  ignorePatterns: ["dist", "build", ".next", "coverage", "node_modules"],
  extends: [
    "eslint:recommended"
  ],
  env: { 
    es2022: true, 
    node: true, 
    browser: true 
  },
  parserOptions: { 
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-console": "warn",
    "prefer-const": "error"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "no-unused-vars": "off"
      }
    },
    {
      files: ["*.js", "*.cjs"],
      env: { node: true }
    }
  ]
};