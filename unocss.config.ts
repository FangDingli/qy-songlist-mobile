import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons
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
    presetIcons(),
    presetAttributify(),
  ],
})
