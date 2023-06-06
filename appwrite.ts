import { Account, Client, Databases, ID, Storage } from 'appwrite'

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    // .setProject('647cd5ac8e43e4b9ad11');
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)

    const account = new Account(client);
    const database = new Databases(client);
    const storage = new Storage(client);

    export { client, account, database, storage, ID }

