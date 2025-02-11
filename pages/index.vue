<template>
  <div class="Main">
    <h1 v-if="userStore.user">Welcome, {{ userStore.user.name }}!</h1>
    <div class="lg:w-5/6 sm:w-full sm:p-4 lg:m-auto">
      <Section title="New Movies To Be Released" :movies="futureMovies" />
      <Section title="Out Now!" :movies="movies" v-if="movies.length" />
      <Section title="High Rated Movies" :movies="topRatedMovies" v-if="topRatedMovies.length" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Section from '@/components/Section.vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from "~/stores/user";

export default {
  name: 'IndexPage',
  components: {
    Section,
  },

  setup() {
    const userStore = useUserStore();  // Initialize the Pinia store
    const movies = ref([]);
    const topRatedMovies = ref([]);
    const futureMovies = ref([]);
    const currentDate = new Date().toISOString().split('T')[0];
    const moviesPerDay = 5;
    userStore.getUser();
    // Function to fetch movies data
    const fetchMovies = async (cacheKey, endpoint, stateRef) => {
      const cachedMovies = typeof window !== 'undefined' && localStorage.getItem(cacheKey);
      if (cachedMovies) {
        stateRef.value = JSON.parse(cachedMovies);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${useRuntimeConfig().public.TMDB}&language=en-US&page=1`
        );
        stateRef.value = response.data.results;
        if (typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(stateRef.value));
        }
      } catch (error) {
        console.error(`Error fetching ${stateRef.value}:`, error);
      }
    };

    // Function to fetch upcoming future movies
    const fetchFutureMovies = async () => {
      const cacheKey = 'upcomingMovies';
      const lastDisplayedDateKey = 'lastDisplayedDate';
      const cachedMovies = typeof window !== 'undefined' && localStorage.getItem(cacheKey);
      const lastDisplayedDate = typeof window !== 'undefined' && localStorage.getItem(lastDisplayedDateKey);

      if (cachedMovies && lastDisplayedDate === currentDate) {
        futureMovies.value = JSON.parse(cachedMovies).slice(0, moviesPerDay);
        return;
      }

      try {
        let allMovies = [];
        let currentPage = 1;
        let totalPages = 1;

        do {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${useRuntimeConfig().public.TMDB}&language=en-US&page=${currentPage}`
          );
          allMovies.push(...response.data.results);
          totalPages = response.data.total_pages;
          currentPage++;
        } while (currentPage <= totalPages);

        const filteredMovies = allMovies
          .filter(movie => new Date(movie.release_date) > new Date())
          .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

        if (typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(filteredMovies));
          localStorage.setItem(lastDisplayedDateKey, currentDate);
        }

        futureMovies.value = filteredMovies.slice(0, moviesPerDay);
      } catch (error) {
        console.error('Error fetching future movies:', error);
      }
    };

    // On component mounted, fetch movie data
    onMounted(() => {
      fetchMovies('nowPlayingMovies', 'now_playing', movies);
      fetchMovies('topRatedMovies', 'top_rated', topRatedMovies);
      fetchFutureMovies();
    });

    // Return values to template
    return {
      userStore,  // Returning user store to be accessed in the template
      movies,
      topRatedMovies,
      futureMovies,
    };
  },
};
</script>

<style scoped>
.Main {
  /* Add any styles you need */
}
</style>
