


import * as sdk from 'node-appwrite';
// import { Client, Account, Databases, Storage,Messaging, Users } from "node-appwrite";

export const {
  
    PROJECT_ID,
    API_KEY,
    DATABASE_ID, 
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID:BUCKET_ID,
      NEXT_PUBLIC_ENDPOINT:ENDPOINT,

} = process.env;



const client = new sdk.Client();

// // const client = new Client();
// // const users = new sdk.Users(client);
// // const result = await users.createBcryptUser(
// //     '<USER_ID>', // userId
// //     '<NAME>', // name (optional)
// //     'email@example.com', // email (optional)
// //     '+12065550100', // phone (optional)
// //     '', // password (optional)
    
// // );

client.
     setEndpoint(ENDPOINT!) //!telling it its there
     .setProject(PROJECT_ID!)
     .setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);

// export const databases = new Databases(client);
// export const storage = new Storage(client);
// export const messaging = new Messaging(client);
// export const users = new Users(client); 



// console.log("Appwrite Endpoint:", ENDPOINT);

