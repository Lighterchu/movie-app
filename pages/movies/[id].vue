<template>
  <div>
    <div class="flex justify-center items-center rounded-md px-2 pb-4">
      <div class="bg-gray-800 mt-2 rounded-md px-4 max-auto">
        <h1 class="text-center text-red-700 font-sans">
          {{ movie.title }}
        </h1>
        <p class="pb-2 text-lg">
          {{ movie.tagline }}
          <br />
        </p>
        <p class="pb-2 bg-black rounded-md px-5 mb-2 w-96">
          Movie Description:
          <br />
          {{ movie.overview }}
        </p>
        <img
          class="rounded-md mb-2 h-60 w-full"
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt="no found"
        />
      </div>
    </div>
    <div class="flex justify-between">
      <a
        v-if="movie.homepage"
        class="bg-gray-700 p-1 ml-4 rounded-md mb-4 hover:bg-green-800"
        :href="movie.homepage"
        target="_blank"
        rel="noopener"
        >Visit Site</a
      >
      <NuxtLink
        class="bg-gray-700 p-1 h-8 mr-4 rounded-md hover:bg-green-800"
        :to="{ name: 'index' }"
        >Back Home</NuxtLink
      >
    </div>

    <div class="text-red-900 mx-2 flex justify-center">
      <div v-if="movieTrailer" class="video-container">
        <iframe
          class="h-screen w-screen pb-4"
          :src="videoUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "singleMovie",

  // Fetching data when component is created
  created() {
    this.getSingleMovie();
    this.getMoviePreview();
  },

  // Setting the page title dynamically
  head() {
    return {
      title: this.movie.title || "Movie Details",
    };
  },

  data() {
    return {
      movie: {}, // Use an object to store movie details
      movieVideoPreview: {},
      movieTrailer: "",
    };
  },

  computed: {
    videoUrl() {
      return `https://www.youtube.com/embed/${this.movieTrailer}?autoplay=1`;
    },
  },

  methods: {
    async getSingleMovie() {
      const apiKey = this.$config.public.TMDB;

      console.log(apiKey + "thiis is the the api key");
      const movieId = this.$route.params.id; // Accessing the route parameter directly
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        this.movie = response.data;
        console.log(this.movie);
        this.searchGenre(this.movie.genres);
      } catch (error) {
        console.error("Error fetching the movie details:", error);
      }
    },

    searchTrailer(videos) {
      //   console.log(videos);
      let trailer = videos.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.name.toLowerCase().includes("official trailer")
      );
      if (!trailer) {
        trailer = videos.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
      }
      if (trailer) {
        this.movieTrailer = trailer.key;
      } else {
        console.error("No trailer found");
      }
    },

    searchGenre(videos) {
      //   const horrorVideos = videos.filter((video) => video.name === "Horror");
      //   const romanceVideos = videos.filter((video) => video.name === "Romance");
      //   console.log("Horror Videos:", horrorVideos);
      //   console.log("Romance Videos:", romanceVideos);
    },

    async getMoviePreview() {
      const movieId = this.$route.params.id; // Accessing the route parameter directly
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}}/videos`,
          {
            params: {
              api_key: this.$config.public.TMDB, // Ensure to replace with your TMDb API key
            },
          }
        );
        const videos = response.data.results;
        this.searchTrailer(videos);
      } catch (error) {
        console.error("Error fetching the movie details:", error);
      }
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
