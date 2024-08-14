<template>
  <div class="header bg-gray-900">
    <div class="nav-container text-red-600 p-2 font-medium flex">
      <span>
        <h1>Quick Move</h1>
      </span>
      <div class="m-auto">
        <label class="mr-2" for="">Search Movie</label>
        <input class="rounded-md" type="text" name="" id="">
      </div>
      <div class=" right-0 ml-auto">
        <ul class="flex space-x-2">
            <NuxtLink
                class="  p-1 sm:bg-red-700  lg:bg-green-600 rounded-md hover:bg-green-500"
                to="https:www.google.com"
                >Login
            </NuxtLink>
            <NuxtLink
                class="  p-1 sm:bg-red-700  lg:bg-green-600 rounded-md hover:bg-green-500"
                to="https:www.google.com"
                >Register
            </NuxtLink>
          <!-- <li>Login</li>
          <li>Register</li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>
