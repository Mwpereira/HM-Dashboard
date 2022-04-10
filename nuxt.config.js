export default {
  ssr: false,
  target: 'static',
  loading: false,
  head: {
    title: 'HM Dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Helium Miner Dashboard' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'HM Dashboard, HNT, HNT-Miner, HNT Coin, Helium Coin, Bobcat Miner, Nebra Miner, Crypto, Crypto Currency, mwpereira'
      },
      { hid: 'og:title', property: 'og:title', content: 'HM Dashboard' },
      { hid: 'og:description', property: 'og:description', content: 'Helium Miner Dashboard' },
      { hid: 'og:image', property: 'og:image', content: '/site.png' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'HM Dashboard' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', size: '180x180', href: '/icons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', size: '32x32', href: '/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', size: '16x16', href: '/icons/favicon-16x16.png' },
      { rel: 'manifest', href: '/icons/site.webmanifest' },
      { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', content: '#5bbad5' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.15.3/css/all.css' }
    ]
  },
  css: [
    'assets/scss/main.scss'
  ],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build'
  ],
  modules: [
    'nuxt-buefy',
    '@nuxtjs/google-gtag',
    '@nuxtjs/style-resources'
  ],
  'google-gtag': {
    id: 'G-REEZCVN09K',
    config: {
      anonymize_ip: true,
      send_page_view: false,
      linker: {
        domains: ['hmdashboard.mwpereira.ca']
      }
    }
  },
  build: {},
  generate: { fallback: true },
  server: {
    port: 8080
  },
  env: {
    coinGeckoAPI: process.env.coinGeckoAPI || 'https://api.coingecko.com/api/v3/coins/helium',
    heliumAPI: process.env.HELIUM_API || 'https://api.helium.io/v1/'
  }
}
