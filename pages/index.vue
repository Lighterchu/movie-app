<template>
  <div class="Main">
    <div class=" lg:w-5/6 sm:w-full sm:p-4 lg:m-auto">
      <Section title="New Movies To Be Released" :movies="futureMovies" />
      <Section title="Out Now!" :movies="movies" v-if="movies.length" />
      <Section title="High Rated Movies" :movies="topRatedMovies" v-if="topRatedMovies.length" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Section from "@/components/Section.vue";

export default {
  name: "IndexPage",
  components: {
    Section,
  },

  head() {
    return {
      title: "Movie App - Latest Streaming Movie Info",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Get all the latest streaming movies in theaters & online",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "movies, stream, streaming",
        },
      ],
    };
  },

  data() {
    return {
      movies: [],
      topRatedMovies: [],
      futureMovies: [],
      currentDate: new Date().toISOString().split("T")[0],
      moviesPerDay: 5,
    };
  },

  created() {
    this.fetchMovies("nowPlayingMovies", "now_playing", "movies");
    this.fetchMovies("topRatedMovies", "top_rated", "topRatedMovies");
    this.fetchFutureMovies();
  },

  methods: {
    async fetchMovies(cacheKey, endpoint, stateKey) {
      const cachedMovies = localStorage.getItem(cacheKey);
      if (cachedMovies) {
        this[stateKey] = JSON.parse(cachedMovies);
      } else {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${this.$config.public.TMDB}&language=en-US&page=1`
          );
          this[stateKey] = response.data.results;
          localStorage.setItem(cacheKey, JSON.stringify(this[stateKey]));
        } catch (error) {
          console.error(`Error fetching ${stateKey}:`, error);
        }
      }
    },

    async fetchFutureMovies() {
      const cacheKey = "upcomingMovies";
      const lastDisplayedDateKey = "lastDisplayedDate";
      const cachedMovies = localStorage.getItem(cacheKey);
      const lastDisplayedDate = localStorage.getItem(lastDisplayedDateKey);

      if (cachedMovies && lastDisplayedDate === this.currentDate) {
        this.futureMovies = JSON.parse(cachedMovies).slice(0, this.moviesPerDay);
      } else {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.$config.public.TMDB}&language=en-US&page=1`
          );

          let allMovies = response.data.results;
          const totalPages = response.data.total_pages;

          if (totalPages > 1) {
            for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
              const pageResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.$config.public.TMDB}&language=en-US&page=${currentPage}`
              );
              allMovies.push(...pageResponse.data.results);
            }
          }

          const filteredMovies = allMovies
            .filter(movie => new Date(movie.release_date) > new Date())
            .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

          localStorage.setItem(cacheKey, JSON.stringify(filteredMovies));
          localStorage.setItem(lastDisplayedDateKey, this.currentDate);

          this.futureMovies = filteredMovies.slice(0, this.moviesPerDay);
        } catch (error) {
          console.error("Error fetching future movies:", error);
        }
      }
    },
  },
};
</script>
