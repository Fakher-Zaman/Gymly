import { Client, Account } from 'appwrite';
import vars from '../constants/variables';

const client = new Client();
const account = new Account(client);

client
    .setEndpoint(vars.apiEndpoint) // Your Appwrite Endpoint
    .setProject(vars.apiProjectId); // Your Appwrite Project ID

export { client, account };
