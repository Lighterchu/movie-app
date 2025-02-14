import { Client, Account, Databases, Storage } from 'appwrite';

export default defineNuxtPlugin(() => {
  const client = new Client();
  const config = useRuntimeConfig(); // ✅ Get runtime config first
  client
    .setEndpoint('https://cloud.appwrite.io/v1') // ✅ Appwrite endpoint
    .setProject(config.public.APP_WRITE); // ✅ Project ID from env
  const account = new Account(client); // ✅ Manages authentication
  const databases = new Databases(client); // ✅ Access databases
  const storage = new Storage(client); // ✅ Handle file storage

  return {
    provide: {
      appwrite: client,
      account,
      databases,
      storage,
    },
  };
});
