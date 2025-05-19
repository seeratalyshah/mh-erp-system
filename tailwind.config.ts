// tailwind.config.ts
import type { Config } from 'tailwindcss'
import scrollbar from 'tailwind-scrollbar'

export default {
  /*
   * v4 detects your templates automatically, so `content`
   * can stay empty unless you need to whitelist extra files.
   */
  content: [
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],

  theme: {
    extend: {
      colors: {
        /* Your brand colour */
        primary: '#0488a6',        // bg-primary, text-primary, etc.
        // ── optional tints/shades ──
        // primary: {
        //   DEFAULT : '#0488a6',
        //   50:  '#e2f6fa',
        //   100: '#b8eaf5',
        //   200: '#8edeef',
        //   300: '#64d2e9',
        //   400: '#3ac6e3',
        //   500: '#0488a6',
        //   600: '#036e87',
        //   700: '#025469',
        //   800: '#01394a',
        //   900: '#001f2c',
        // },
      },
    },
  },

  plugins: [scrollbar({ nocompatible: true }),],
} satisfies Config
