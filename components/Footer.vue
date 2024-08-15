<template>
  <div>
    <footer>
        <p class="fixed bottom-0 h-2 left-0 w-full flex justify-center bg-red-500 pb-5">&copy; {{ currentYear }} Lighterchu. All rights reserved.</p>
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