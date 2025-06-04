// uno.config.ts
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  theme: {
    colors: {
      base: {
        'white': '#fff',
        'black': '#0a0a0b',
      },
      background: {
        '100': '#F6F6F9',
        '200': '#eaeaf1',
        '300': '#d1d1d4',
        '400': '#2e2e2e',
        '500': '#f8f9fa',
        '600': '#f2f2f2',
        '700': '#eaeaf1',
      },
      primary: {
        DEFAULT: '#4EAC6D',
        '400': '#4EAC6DE6',
        '300': '#8aa4f6 ',
        '200': '#b12f9',
        '100': '#d8ec1fc',
      },
      secondary: {
        DEFAULT: '#495057',
        '500': '#878a92',
        '400': '#495057BF',
        '300': '#FFFFFF80 ',
        '200': '#DAE1E7',
        '100': '#E7EBEF',
      },
      neutrals: {
        '1000': '#151314',
        '900': '#2b2829',
        '800': '#433e3f',
        '700': '#5a5555',
        '600': '#726c6c',
        '500': '#898384',
        '400': '#9f9c9c ',
        '300': '#b5b3b3 ',
        '200': '#cccbcb',
        '100': '#e3e3e3 ',
      },
      success: {
        DEFAULT: '#00A86B',
        '500': '#00794d',
        '400': '#00ec97 ',
        '300': '#32ffb4 ',
        '200': '#76ffcd',
        '100': '#bbffe6 ',
      },
      warning: {
        DEFAULT: '#F6A500',
        '500': '#885b00',
        '400': '#bf8000 ',
        '300': '#ffbe39 ',
        '200': '#ffd47b',
        '100': '#ffe9bd ',
      },
      error: {
        DEFAULT: '#F63B2F',
        '500': '#990f07',
        '400': '#d91609 ',
        '300': '#f86c63 ',
        '200': '#fb9d97',
        '100': '#fdcecb ',
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        sm: "20px",
        lg: "30px",
        xl: "30px",
      },
      maxWidth: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1320px",
      },
    },
  },
  rules: [
  ],
  shortcuts: [
  ],
})