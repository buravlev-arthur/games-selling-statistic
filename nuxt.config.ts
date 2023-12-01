// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.scss'],

  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],

  googleFonts: {
    families: {
      Nunito: true
    },
    display: 'swap',
    subsets: 'cyrillic',
    prefetch: true,
    preconnect: true,
    download: true,
    base64: true,
    stylePath: 'assets/google-fonts.css',
    fontsDir: 'assets/fonts'
  },

  eslint: {
    lintOnStart: false,
    failOnError: true
  },

  stylelint: {
    include: './**/*.{css,scss,vue}',
    lintOnStart: false
  }
})
