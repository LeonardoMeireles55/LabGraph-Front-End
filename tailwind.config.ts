import type { Config } from 'tailwindcss'
import colors  from './src/styles/colors'

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
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      danger: colors.danger,
      background: colors.background,
      surface: colors.surface,
      textPrimary: colors.textPrimary,
      textSecondary: colors.textSecondary,
      muted: colors.muted,
      gridLines: colors.gridLines,
      border: colors.border,
    },
  },
  plugins: [],
}
export default config
