<template>
    <div class="section">
      <h1 class="text-red-500">{{ title }}</h1>
      <div class="bg-gray-800 overflow-x-auto rounded-lg">
        <p v-if="!movies.length">No movies found.</p>
        <ul v-else class="flex space-x-3">
          <li v-for="movie in movies" :key="movie.id" class="flex-shrink-0">
            <Cards :data="movie" class="w-60" />
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import Cards from "@/components/Cards.vue";
  
  export default {
    name: "Section",
    props: {
      title: {
        type: String,
        required: true,
      },
      movies: {
        type: Array,
        required: true,
      },
    },
    components: {
      Cards,
    },
  };
  </script>
  