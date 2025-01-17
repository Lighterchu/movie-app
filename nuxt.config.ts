// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Quick Move - Latest Streaming Movie Info',
      meta: [
        // General meta tags
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
        // Open Graph meta tags
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
          content: '/movie-app-image.png', // Replace with your image URL
        },
        {
          property: 'og:url',
          content: 'https://yourapp.com', // Replace with your app URL
        },
        {
          property: 'og:type',
          content: 'website',
        },
        // Twitter Card meta tags
        {
          name: 'twitter:card',
          content: '/image/movie-app-image.png',
        },
        {
          name: 'twitter:title',
          content: 'Quick Move - Latest Streaming Movie Info',
        },
        {
          name: 'twitter:description',
          content: 'Get all the latest streaming movies in theaters & online',
        },
        {
          name: 'twitter:image',
          content: '/image/movie-app-image.png', // Replace with your image URL
        },
      ]
    }
  },

  
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      TMDB: process.env.NUXT_PUBLIC_TMDB
    }
  },

  modules: [
    "@nuxt/image",
  ],


  compatibilityDate: "2024-08-15",
})