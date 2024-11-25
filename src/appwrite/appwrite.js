import { Client, Account } from 'appwrite';
// import Config from 'react-native-config';

const client = new Client();
const account = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('673ed3e3001a66a2c4cb'); // Your Appwrite Project ID

export { client, account };
