<template>
    <div class="Main">
      <div class="w-5/6 m-auto">
        <h1 class="text-red-500">Out Now!</h1>
        <div class="bg-gray-800 overflow-x-auto mb-2 rounded-lg">
          <p v-if="!movies.length">No movies found.</p>
          <ul v-else class="flex space-x-3">
            <li v-for="movie in movies" :key="movie.id" class="flex-shrink-0">
              <Cards :data="movie" class="w-60" />
            </li>
          </ul>
        </div>
        <h1 class="text-red-500">High Rated Movies</h1>
        <div class="bg-gray-800 overflow-x-auto rounded-lg">
          <p v-if="!topRatedMovies.length">No movies found.</p>
          <ul v-else class="flex space-x-3">
            <li v-for="topMovie in topRatedMovies" :key="topMovie.id" class="flex-shrink-0">
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
      searchedMovies: [],
      searchInput: "",
    };
  },

  created() {
    this.getMovies();
    this.getTopRated()
  },

  methods: {
    async getMovies() {
      try {
        const apiKey = this.$config.public.TMDB
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
        );
        this.movies = response.data.results;
        // console.log(this.movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },

    async getTopRated() {
      try {
        const apiKey = this.$config.public.TMDB
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
        );
        this.topRatedMovies = response.data.results;
        // console.log(this.topRatedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
  },
};
</script>
