/**
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 100,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  bracketSameLine: false,
  embeddedLanguageFormatting: 'auto',
  jsxSingleQuote: true,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
  tailwindConfig: './tailwind.config.ts',
};

module.exports = config;
