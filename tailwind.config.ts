import type { Config } from 'tailwindcss'
import colors from './src/styles/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      primary: colors.lightColors.primary,
      secondary: colors.lightColors.secondary,
      accent: colors.lightColors.accent,
      danger: colors.lightColors.danger,
      background: colors.lightColors.background,
      surface: colors.lightColors.surface,
      textPrimary: colors.lightColors.textPrimary,
      textSecondary: colors.lightColors.textSecondary,
      muted: colors.lightColors.muted,
      gridLines: colors.lightColors.gridLines,
      border: colors.lightColors.border,
      white: colors.lightColors.white,
    },
  },
  plugins: [],
}
export default config
