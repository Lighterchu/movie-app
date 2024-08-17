<template>
  <div class="bg-gray-500 p-2 rounded-md ml-2 mt-2 mr-2">
    <h1
      class="text-red-900 h-11 text-sm bg-yellow-300 mb-2 rounded-md text-center"
    >
      {{ data.title }}
    </h1>

    <NuxtLink
      class="p-1 sm:bg-red-700 lg:bg-green-600 rounded-md hover:bg-green-500"
      :to="{ name: 'movies-id', params: { id: data.id } }"
    >
      More Info
    </NuxtLink>

    <h2>Date Release: {{ formattedReleaseDate }}</h2>

    <!-- <img class="rounded-md " :src="posterUrl" alt="Movie Poster" /> -->
    <NuxtImg
      :src="posterUrl"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
      class="rounded-md w-full h-60" 
      alt="Movie Poster"
    />
  </div>
</template>

<script>
export default {
  name: "Cards",

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    posterUrl() {
      return this.data.poster_path
        ? `https://image.tmdb.org/t/p/w500/${this.data.poster_path}`
        : "";
    },

    formattedReleaseDate() {
      return this.data.release_date
        ? new Date(this.data.release_date).toLocaleString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "Unknown";
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles here if needed */
</style>
