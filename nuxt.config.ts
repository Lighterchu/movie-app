// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  
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
      TMDB: process.env.API_TMDBKEY
    }
  },  


  modules: [
    "@nuxt/image",
   
  ]
  
})