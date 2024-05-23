<template>
  <div>
    <footer>
        <p class="text-center text-red-700 pt-2">&copy; {{ currentYear }} Lighterchu. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>