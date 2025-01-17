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
      const oldDate = localStorage.getItem("lastFetchDate");

      if (cachedMovies && oldDate === this.currentDate) {
        console.log("Using cached movies:", this.currentDate);
        this[stateKey] = JSON.parse(cachedMovies);
      } else {
        try {
          console.log("Fetching new movies");
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${this.$config.public.TMDB}&language=en-US&page=1`
          );
          this[stateKey] = response.data.results;

          // Update cache and date
          localStorage.setItem(cacheKey, JSON.stringify(this[stateKey]));
          localStorage.setItem("lastFetchDate", this.currentDate);
        } catch (error) {
          console.error(`Error fetching ${stateKey}:`, error);
        }
      }
    },

    async fetchFutureMovies() {
      const cacheKey = "upcomingMovies";
      const lastFetchInfoKey = "lastFetchInfo";
      const moviesPerWeek = 5;

      const cachedMovies = JSON.parse(localStorage.getItem(cacheKey) || "[]");
      const lastFetchInfo = JSON.parse(
        localStorage.getItem(lastFetchInfoKey) || "{}"
      );
      const currentWeek = this.getCurrentWeek();

      // Check if we already fetched movies for this week
      if (
        lastFetchInfo?.week === currentWeek &&
        cachedMovies.length >= moviesPerWeek
      ) {
        // Use cached movies
        this.futureMovies = cachedMovies.slice(0, moviesPerWeek);
        return;
      }

      try {
        // Start fetching from the last page and index or from the beginning
        let currentPage = lastFetchInfo?.page || 1;
        let currentMovieIndex = lastFetchInfo?.index || 0;
        let allFetchedMovies = [...cachedMovies];

        while (allFetchedMovies.length < moviesPerWeek) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.$config.public.TMDB}&language=en-US&page=${currentPage}`
          );

          const movies = response.data.results
            .filter((movie) => new Date(movie.release_date) > new Date())
            .sort(
              (a, b) => new Date(a.release_date) - new Date(b.release_date)
            );

          // Append new movies to the local cache
          allFetchedMovies.push(...movies.slice(currentMovieIndex));
          currentMovieIndex = 0; // Reset index after the first batch
          currentPage++;

          // Break if there are no more pages to fetch
          if (currentPage > response.data.total_pages) {
            break;
          }
        }

        // Cache the movies and fetch info
        localStorage.setItem(
          cacheKey,
          JSON.stringify(allFetchedMovies.slice(0, moviesPerWeek))
        );
        localStorage.setItem(
          lastFetchInfoKey,
          JSON.stringify({
            week: currentWeek,
            page: currentPage - 1,
            index: currentMovieIndex,
          })
        );

        this.futureMovies = allFetchedMovies.slice(0, moviesPerWeek);
      } catch (error) {
        console.error("Error fetching future movies:", error);
      }
    },

    getCurrentWeek() {
      // Returns the current year-week string, e.g., "2025-03"
      const now = new Date();
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
      const pastDaysOfYear = (now - firstDayOfYear + 86400000) / 86400000; // Add 1 day in ms
      const weekNumber = Math.ceil(pastDaysOfYear / 7);
      return `${now.getFullYear()}-${weekNumber}`;
    },
  },
};
</script>
