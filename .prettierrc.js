/**
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
    tailwindConfig: './tailwind.config.ts',
    printWidth: 120,
};

module.exports = config;
