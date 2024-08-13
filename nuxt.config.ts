// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      title: "Bens Portfoilo",
      meta: [{
        name: "description",
        content: "This is where I host my work and showcase my skills"
      }]
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
      TMDB: process.env.API_TMDBKEY
    }
  },  


  modules: [
    "@nuxt/image",
   
  ]
  
})