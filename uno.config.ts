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
      base : {
        'white': '#fff',
        'black': '#0a0a0b',
      },
      background: {
        '100': '#F5F5F5',
        '200': '#E0E0E0',
        '300': '#F8F9FA'
      },
      primary: {
        DEFAULT: '#0F3CC9',
        '1000': '#061953',
        '900': '#082270',
        '800': '#0b2a8e',
        '700': '#0d33ab',
        '600': '#1549ee',
        '500': '#3c67f0',
        '400': '#6386f3',
        '300': '#8aa4f6 ',
        '200': '#b1c2f9',
        '100': '#d8e1fc',
      },
      secondary: {
        DEFAULT: '#AAB9C5',
        '1000': '#323F49',
        '900': '#4A5E6D',
        '800': '#637D92',
        '700': '#7991A4',
        '600': '#92A5B5',
        '500': '#B6C3CD',
        '400': '#C2CDD6 ',
        '300': '#CED7DE ',
        '200': '#DAE1E7',
        '100': '#E7EBEF',
      },
      neutrals   : {
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