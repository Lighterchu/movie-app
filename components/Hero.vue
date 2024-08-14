<template>
  <div class="header bg-gray-900">
    <div class="nav-container text-red-600 p-2 font-medium flex">
        <NuxtLink
                class="  p-1 sm:bg-red-700  lg:bg-black rounded-md hover:bg-white"
                to="/"
                >Quick Move
            </NuxtLink>
      <div class="m-auto w-2/4  flex">
        <label class="mr-2" for="">Search Movie</label>
        <input class=" w-3/4 mr-2 pl-2 text-black rounded-md" type="text" name="" id="">
        <button class="hover:bg-white rounded-md p-1 bg-black ">Search</button>
      </div>
      
      <div class=" right-0 ml-auto">
        <ul class="flex space-x-2">
            <NuxtLink
                class="  p-1 sm:bg-red-700  lg:bg-black rounded-md hover:bg-white"
                to="login"
                >Login
            </NuxtLink>
            <NuxtLink
                class="  p-1 sm:bg-red-700  lg:bg-black rounded-md hover:bg-white"
                to="register"
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
