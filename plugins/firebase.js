import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'


export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDnU_G_mZD6N4BCFTzsUus68CQyUs9x_Ow",
        authDomain: "quick-move-53f74.firebaseapp.com",
        projectId: "quick-move-53f74",
        storageBucket: "quick-move-53f74.appspot.com",
        messagingSenderId: "858015971490",
        appId: "1:858015971490:web:dd7d4436b36d8bd3b47ffb",
        measurementId: "G-2NDZ9TE6YF"
        };
  

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const firestore = getFirestore(app)

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)

    nuxtApp.vueApp.provide('firestore', firestore)
    nuxtApp.provide('firestore', firestore)
})
