import { Client, Account, Databases, Storage, ID } from 'appwrite';

export default defineNuxtPlugin(() => {
  const client = new Client();

  client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('66bdc5c2001ad462e3df'); // Your project ID

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

  return {
    provide: {
      appwrite: client,
      account,
      databases,
      storage,
    },
  };
});