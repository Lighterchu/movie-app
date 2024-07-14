<template>
  <div
    class="bg-gray-500 p-2 rounded-md ml-2 mt-2 mb-2 mr-2 h-96  overflow-auto"
  >
    <h1 class="text-red-900 bg-yellow-300 mb-2 rounded-md text-center">
      {{ data.title }}
    </h1>
    
    <NuxtLink
      class="  p-1 sm:bg-red-700  lg:bg-green-600 rounded-md hover:bg-green-500"
      :to="{ name: 'movies-id', params: { id: data.id } }"
    >More Info
    </NuxtLink>
    <h2>
      Date Release:
      {{
        new Date(data.release_date).toLocaleString("en-us", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      }}
    </h2>
    <img
      class="rounded-md w-full"
      :src="`https://image.tmdb.org/t/p/w500/${data.poster_path}`"
      alt="no found"
    />

    <!-- <div
      v-if="data.overview"
      class="overflow-y-auto h-32 pt-3 mt-2 bg-gray-800 w-62 rounded-md p-3"
    >
      <h1>Description</h1>
      <p class="text-sm">{{ data.overview }}</p>
    </div>
    <div>
        <h3>{{ data.tagline }}</h3>
    </div> -->
   
  </div>
</template>

<script>
export default {
  name: "Cards",

  props: {
    data: {
      type: Object,
      required: false,
    },
  },

  computed: {
    poster() {
      const baseUrl = "https://api.themoviedb.org/3";
      return this.data.poster_path
        ? `${baseUrl}${this.data.poster_path}`
        : null;
    },
  },
};
</script>
