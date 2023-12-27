// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.scss'],

  app: {
    head: {
      chatset: 'utf-8',
      title: 'GameStats - статистика продаж компьютерных игр в России',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [
        {
          name: 'description',
          content:
            'Статистика продаж компьютерных игр в российских маркетплейсах для Steam, Xbox и PlayStation. Димамика стоимости игр и количества товаров на рынке.'
        },
        {
          name: 'keywords',
          content:
            'статистика, продажы, игры, графики, цены, товары, динамика, изменение, стоимость, компьютерные игры, steam, xbox, playstation'
        }
      ]
    }
  },

  runtimeConfig: {
    dbHost: '',
    dbPort: '',
    dbUser: '',
    dbPassword: '',
    dbName: ''
  },

  routeRules: {
    '/': { swr: 86400 }
  },

  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    'nuxt-quasar-ui'
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
  },

  quasar: {
    sassVariables: true,
    plugins: ['Dark'],
    config: {
      dark: true,
      brand: {
        primary: '#A1C6C9',
        secondary: '#5C8374',
        accent: '#9EC8B9',
        dark: '#143445',
        // @ts-ignore
        'dark-page': '#092635',
        positive: '#347A58',
        negative: '#7A3434',
        info: '#1B4242',
        warning: '#7A5E34'
      }
    },
    iconSet: 'material-icons-round',
    extras: {
      fontIcons: ['material-icons-round']
    }
  }
})
