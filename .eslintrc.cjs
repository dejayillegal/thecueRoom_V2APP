module.exports = {
  root: true,
  ignorePatterns: ["dist", "build", ".next", "coverage", "node_modules"],
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { 
    project: true, 
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "import", "unused-imports"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "unused-imports/no-unused-imports": "error",
    "import/order": ["error", { 
      "newlines-between": "always", 
      alphabetize: { order: "asc" } 
    }],
    "react/jsx-no-useless-fragment": "warn",
    "react/no-unstable-nested-components": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error"
  },
  settings: { 
    react: { version: "detect" },
    "import/resolver": {
      typescript: {
        project: ["tsconfig.json", "apps/*/tsconfig.json", "packages/*/tsconfig.json"]
      }
    }
  },
  overrides: [
    {
      files: ["*.js", "*.cjs"],
      env: { node: true },
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ]
};