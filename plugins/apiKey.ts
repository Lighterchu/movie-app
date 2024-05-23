export default defineNuxtPlugin((NuxtApp) => {
    const config = useRuntimeConfig()
  
    // Access baseURL universally
    const TMDB_API = config.public.TMDB
  })