<template>
  <div class="Main">
    <div class="lg:w-5/6 m-auto sm:w-5/6 lg:m-auto  ">
      <h1 class="text-red-500">New Movies To be Release</h1>
      <div class="bg-gray-800  overflow-x-auto rounded-lg">
        <p v-if="!futureMovies.length">Searching for Movies...</p>
        <ul v-else class="flex space-x-3">
          <li
            v-for="futureMovie in futureMovies"
            :key="futureMovie.id"
            class="flex-shrink-0"
          >
            <Cards :data="futureMovie" class="w-60" />
          </li>
        </ul>
      </div>
      <h1 class="text-red-500">Out Now!</h1>
      <div class="bg-gray-800 overflow-x-auto mb-2 rounded-lg">
        <p v-if="!movies.length">Searching for Movies....</p>
        <ul v-else class="flex space-x-3">
          <li v-for="movie in movies" :key="movie.id" class="flex-shrink-0">
            <Cards :data="movie" class="w-60" />
          </li>
        </ul>
      </div>
      <h1 class="text-red-500">High Rated Movies</h1>
      <div class="bg-gray-800 overflow-x-auto rounded-lg">
        <p v-if="!topRatedMovies.length">Searching for Movies...</p>
        <ul v-else class="flex space-x-3">
          <li
            v-for="topMovie in topRatedMovies"
            :key="topMovie.id"
            class="flex-shrink-0"
          >
            <Cards :data="topMovie" class="w-60" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cards from "@/components/Cards.vue";
export default {
  name: "index",
  components: {
    Cards,
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
      searchedMovies: [],
      searchInput: "",
      theDate: ''
    };
  },

  created() {
    this.getMovies();
    this.getTopRated();
    this.getFutureMovies();
  },

  methods: {
    async getMovies() {
      try {
        const cacheKey = 'nowPlayingMovies';
        const cachedMovies = localStorage.getItem(cacheKey);

        if (cachedMovies) {
          this.movies = JSON.parse(cachedMovies);
        } else {
          const apiKey = this.$config.public.TMDB;
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
          );
          this.movies = response.data.results;
          this.movies.sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          );
          localStorage.setItem(cacheKey, JSON.stringify(this.movies));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },

    async getFutureMovies() {
      try {
        const cacheKey = 'upcomingMovies';
        const cachedMovies = localStorage.getItem(cacheKey);

        if (cachedMovies) {
          this.futureMovies = JSON.parse(cachedMovies);
        } else {
          const apiKey = this.$config.public.TMDB;
          let currentPage = 1;
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${currentPage}`
          );

          const totalPages = response.data.total_pages;
          const allMovies = response.data.results;

          // Fetch all pages
          for (currentPage = 2; currentPage <= totalPages; currentPage++) {
            const pageResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${currentPage}`
            );
            allMovies.push(...pageResponse.data.results);
          }

          const currentDate = new Date();
          this.theDate = currentDate;

          // Filter and sort movies
          this.futureMovies = allMovies
            .filter(movie => new Date(movie.release_date) > currentDate)
            .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

          localStorage.setItem(cacheKey, JSON.stringify(this.futureMovies));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },

    async getTopRated() {
      try {
        const cacheKey = 'topRatedMovies';
        const cachedMovies = localStorage.getItem(cacheKey);

        if (cachedMovies) {
          this.topRatedMovies = JSON.parse(cachedMovies);
        } else {
          const apiKey = this.$config.public.TMDB;
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
          );
          this.topRatedMovies = response.data.results;
          localStorage.setItem(cacheKey, JSON.stringify(this.topRatedMovies));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
  },
};
</script>
