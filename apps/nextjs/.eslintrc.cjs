/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["../../.eslintrc.cjs", "next"],
  plugins: ["testing-library"],
  overrides: [
    // Only uses Testing Library lint rules in test files
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
