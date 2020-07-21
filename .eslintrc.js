module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "no-console": "off",
  },
};
