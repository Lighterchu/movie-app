<template>
  <div
    class="main_container h-full text-center flex justify-center items-center"
  >
    <div
      class="m-auto bg-black border-white border text-white blur-0 rounded-3xl bg-op-40 w-2/4 h-5/6"
    >
      <div class="mt-2">
        <h1>Register</h1>
      </div>
      <!-- <button onclick="addData">Testing Database</button> -->
      <div class="h-3/4">
        <div class="flex justify-center items-center  bg-gray-100">
          <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">Sign Up</h2>
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Full Name</label
                >
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  class="block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div class="mb-4">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Email Address</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
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
                  v-model="form.password"
                  class="block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div class="mb-4">
                <label
                  for="confirm-password"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  id="confirm-password"
                  v-model="form.confirmPassword"
                  class="block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div class="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  v-model="form.termsAccepted"
                  class="h-4 w-4 text-indigo-600 text-black focus:ring-indigo-500 border-gray-300 rounded"
                  required
                />
                <label for="terms" class="ml-2 block text-sm text-gray-900">
                  I agree to the
                  <a href="#" class="text-indigo-600 hover:text-indigo-500"
                    >terms and conditions</a
                  >.
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  class="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
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

const addData = async () => {
  try {
    await db.collection('users').add({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    console.log('Data added successfully!');
  } catch (error) {
    console.error('Error adding data:', error);
  }
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
