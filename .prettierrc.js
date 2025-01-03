/**
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  plugins: [
    'prettier-plugin-tailwindcss', // Must be last
    'prettier-plugin-organize-imports',
  ],
  tailwindConfig: './tailwind.config.ts',
  printWidth: 100,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  bracketSameLine: false,
  jsxSingleQuote: true,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  embeddedLanguageFormatting: 'off',
};

module.exports = config;
