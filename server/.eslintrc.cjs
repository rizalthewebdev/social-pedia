module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: "airbnb-base",
   overrides: [],
   parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
   },
   rules: {
      quotes: ["error", "double", { avoidEscape: true }],
      indent: ["error", 3],
      "no-underscore-dangle": "allow",
   },
};
