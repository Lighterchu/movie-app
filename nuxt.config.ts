// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Quick Move",
      meta: [{
        name: "description",
        content: "A place to quickly find the best movies out and what is coming next"
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
      TMDB: "6914264f4ab3de527cd12a15e3659d0b"
    }
  },

  modules: [
    "@nuxt/image",
  ],


  compatibilityDate: "2024-08-15",
})