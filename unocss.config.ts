import {
  defineConfig,
  presetAttributify,
  presetUno,
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  theme: {
    colors: {
      'qiyuan': '#A9F'
    }

  },
  presets: [
    presetUno(),
    presetAttributify(),
  ],
})
