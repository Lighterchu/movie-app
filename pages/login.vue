<template>
  <div class="h-full text-center">
    <div
      class="m-auto bg-black border-white border text-white blur-0 rounded-3xl bg-op-40 sm:w-3/4 w-2/4 h-3/4"
    >
      <div class="mt-2">
        <h1>Sign In</h1>
      </div>
      <!-- <button onclick="addData">Testing Database</button> -->
      <div class="h-full">
        <div class="flex justify-center items-center h-4/5 bg-gray-100">
          <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <form @submit.prevent="register">
              <div class="mb-4"></div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Email Address</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div class="mb-4">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Password</label
                >
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  class="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
                <h1 class="text-black">Or Create Account</h1>
                <br>
                <NuxtLink
                  class="w-full px-20 py-2 sm:px-10 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  to="/register"
                  >Create Account
                </NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { $account, $databases, $ID } = useNuxtApp();

const loggedInUser = ref(null);
const email = ref("");
const password = ref("");
const name = ref("");

const login = async (email, password) => {
  await $account.createEmailPasswordSession(email, password);
  loggedInUser.value = await $account.get();
};

const register = async () => {
  await $account.create("lol", email.value, password.value, name.value);
  login(email.value, password.value);
};

const logout = async () => {
  await $account.deleteSession("current");
  loggedInUser.value = null;
};

const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
});

const handleSubmit = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords don't match.");
    return;
  }
  // Handle form submission
  alert("Form submitted successfully!");
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
