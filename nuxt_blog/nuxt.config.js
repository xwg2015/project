module.exports = {
  /*
  ** Headers of the page
  *
  head: {
    title: 'nuxt_blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#333' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: []
  },
  // css样式重置
  css: [
    '~/assets/sassCore/_reset.scss',
    'swiper/dist/css/swiper.css'
  ],
  // loader
  loaders: [
    {
      test: /\.scss$/,
      loader: 'sass-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 1048576
      }
    }
  ],
  plugins: [
    { src: '~/plugins/vue-ripple-directive', ssr: false }
  ]
}
