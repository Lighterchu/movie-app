    <template>
    <div class="header bg-gray-900 mb-10">
        <div class="nav-container text-red-600 p-2 font-medium flex">
        <!-- Mobile View -->
        <div
            class="bg-gray-900 top-0 sm:block lg:hidden w-full h-20 left-0 absolute flex justify-center"
        >
            <!-- <NuxtLink class="p-1 lg:bg-black rounded-md hover:bg-white" to="/"
            >Quick Move
            </NuxtLink> -->
            <div class="flex p-1 ">
                <nuxt-link to="/">
                    <NuxtImg src="/logo.png" sizes="sm:60px md:60px" class="rounded-full" />
                </nuxt-link>
                <label class="mr-2 mt-2 ml-5">Search Movie</label>
            <input
            class="w-1/4 h-2/4 text-black mt-2 rounded-md pl-2 mr-2"
            type="text"
            name=""
            id=""
            />
            <button class="hover:bg-white rounded-md sm:right-10 right-1 absolute mt-2 mr-1 p-1 bg-black">Search</button>
            </div>
        </div>
        <!-- --- -->

        <NuxtLink
            class="p-1 lg:bg-black md:bg-white rounded-md hover:bg-white"
            to="/"
            >Quick Move
        </NuxtLink>

        <div class="m-auto lg:block sm:hidden w-2/4 flex">
            <label class="mr-2" for="">Search Movie</label>
            <input
            class="w-3/4 mr-2 pl-2 text-black rounded-md"
            type="text"
            name=""
            id=""
            />
            <button class="hover:bg-white rounded-md p-1 bg-black">Search</button>
        </div>

        <div class="right-0 ml-auto">
            <ul class="flex space-x-2">
            <NuxtLink class="p-1 lg:bg-black rounded-md hover:bg-white" to="login"
                >Login
            </NuxtLink>
            <NuxtLink
                class="p-1 lg:bg-black rounded-md hover:bg-white"
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
