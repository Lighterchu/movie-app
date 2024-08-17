<template>
  <div class="Main">
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

export default {
  name: 'IndexPage',
  components: {
    Section,
  },

  head() {
    return {
      title: 'Movie App - Latest Streaming Movie Info',
      meta: [
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
      ],
    };
  },

  setup() {
    const movies = ref([]);
    const topRatedMovies = ref([]);
    const futureMovies = ref([]);
    const currentDate = new Date().toISOString().split('T')[0];
    const moviesPerDay = 5;

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

    onMounted(() => {
      fetchMovies('nowPlayingMovies', 'now_playing', movies);
      fetchMovies('topRatedMovies', 'top_rated', topRatedMovies);
      fetchFutureMovies();
    });

    return {
      movies,
      topRatedMovies,
      futureMovies,
    };
  },
};
</script>
