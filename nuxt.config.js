require('dotenv').config();

const site_title = 'Password Game';
const site_url = 'https://pwd.cosinic.com';
const site_description = 'The Password Game, the guessing game with one word clues.';

const locales = ['en'];
const default_locale = 'en';
const i18n_messages = {
  en: require('./common/i18n/en'),
}

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: site_title,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: site_description
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#c11e77'
      },
      {
        name: 'msapplication-TileColor',
        content: '#c11e77'
      },
      /**
       * TWITTER SEO
       */
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: site_url
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: site_title
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: site_title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: site_description
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/social.jpg'
      },
      /**
       * Open Graph SEO
       */
      {
        hid: 'og:title',
        name: 'og:title',
        content: site_title
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: site_url
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/social.jpg'
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: site_title
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: site_description
      },
      {
        hid: 'og:locale',
        name: 'og:locale',
        content: 'en_US'
      },
      /**
       * For Search Engine Crawling
       */
      {
        hid: 'robots',
        name: 'robots',
        content: 'index,follow'
      },
      {
        hid: 'googlebot',
        name: 'googlebot',
        content: 'index,follow'
      },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    }, {
      rel: 'icon',
      type: 'image/png',
      sizes: "512x512",
      href: '/android-chrome-512x512.png'
    }, {
      rel: 'icon',
      type: 'image/png',
      sizes: "192x192",
      href: '/android-chrome-192x192.png'
    }, {
      rel: 'icon',
      type: 'image/png',
      sizes: "32x32",
      href: '/favicon-32x32.png'
    }, {
      rel: 'icon',
      type: 'image/png',
      sizes: "16x16",
      href: '/favicon-16x16.png'
    }, {
      rel: 'manifest',
      href: '/site.webmanifest'
    }, {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#c11e77'
    }],
    script: [{
      src: 'https://kit.fontawesome.com/aa543d2585.js', //Font Awesome Kit
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#c11e77',
    height: '4px'
  },
  /*
   ** Global CSS
   */
  css: [{
    src: '~/assets/scss/app.scss',
    lang: 'scss'
  }, ],
  plugins: [
    {
      src:
        '~/plugins/webFontLoader.client.js',
    },
    {
      src: '~/plugins/socket.io.js',
      ssr: false,
    },
    {
      src: '~/plugins/localStorage.js',
      ssr: false
    }
  ],
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', {
      id: process.env.GOOGLE_ANALYTICS
    }],
    '@nuxtjs/dotenv',
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
  ],
  /*
   ** Disable Bootstrap-Vue auto import CSS 
   */
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  /**
   * i18n translations
   */
  i18n: {
    locales: locales,
    defaultLocale: default_locale,
    vueI18n: {
      fallbackLocale: default_locale,
      messages: {
        ...i18n_messages
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    filenames: {
      app: ({
        isDev
      }) => isDev ? '[name].js' : '[chunkhash].js',
      chunk: ({
        isDev
      }) => isDev ? '[name].js' : '[chunkhash].js'
    },
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
}
