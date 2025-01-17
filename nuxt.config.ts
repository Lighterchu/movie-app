// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Movie App - Latest Streaming Movie Info',
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
          content: 'movies, stream, streaming',
        },
        // Open Graph meta tags
        {
          property: 'og:title',
          content: 'Movie App - Latest Streaming Movie Info',
        },
        {
          property: 'og:description',
          content: 'Get all the latest streaming movies in theaters & online',
        },
        {
          property: 'og:image',
          content: 'https://yourapp.com/path-to-your-image.jpg', // Replace with your image URL
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
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Movie App - Latest Streaming Movie Info',
        },
        {
          name: 'twitter:description',
          content: 'Get all the latest streaming movies in theaters & online',
        },
        {
          name: 'twitter:image',
          content: 'https://yourapp.com/path-to-your-image.jpg', // Replace with your image URL
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