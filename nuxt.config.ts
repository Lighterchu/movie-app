export default defineNuxtConfig({
  app: {
    head: {
      title: 'Quick Move - Latest Streaming Movie Info',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get all the latest streaming movies in theaters & online',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, streaming, quickmove',
        },
        {
          property: 'og:title',
          content: 'Quick Move - Latest Streaming Movie Info',
        },
        {
          property: 'og:description',
          content: 'Get all the latest streaming movies in theaters & online',
        },
        {
          property: 'og:image',
          content: '/movie-app-image.png', // Image in the public folder
        },
        {
          property: 'og:url',
          content: 'https://quickmove.netlify.app/', // Replace with your app URL
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      //make sure to remove this
      TMDB: process.env.NUXT_PUBLIC_TMDB || "6914264f4ab3de527cd12a15e3659d0b"
    }
  },

  modules: [
    '@nuxt/image',
    '@pinia/nuxt'
  ],

  compatibilityDate: '2025-02-10',
})