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
      navbar: colors.lightColors.navbar,
      surface: colors.lightColors.surface,
      textPrimary: colors.lightColors.textPrimary,
      textSecondary: colors.lightColors.textSecondary,
      muted: colors.lightColors.muted,
      gridLines: colors.lightColors.gridLines,
      border: colors.lightColors.border,
      white: colors.lightColors.white,
      green: colors.lightColors.green,
      shadow: colors.lightColors.shadow,
      overlay: colors.lightColors.overlay,

      // Adicionando as cores do tema escuro
      dark: {
        primary: colors.darkColors.primary,
        secondary: colors.darkColors.secondary,
        accent: colors.darkColors.accent,
        danger: colors.darkColors.danger,
        background: colors.darkColors.background,
        surface: colors.darkColors.surface,
        textPrimary: colors.darkColors.textPrimary,
        textSecondary: colors.darkColors.textSecondary,
        muted: colors.darkColors.muted,
        gridLines: colors.darkColors.gridLines,
        border: colors.darkColors.border,
        white: colors.darkColors.white,
        green: colors.darkColors.green,
        shadow: colors.darkColors.shadow,
        overlay: colors.darkColors.overlay,
      },
    },
  },
  plugins: [],
}

export default config
