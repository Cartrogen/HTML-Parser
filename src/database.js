import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongodbPort = process.env.MONGODB_PORT;
const url = `mongodb://localhost:${mongodbPort}/html-parser`;
let dbClient = null;

export async function connect() {
    if (dbClient) {
        console.log('Reusing existing MongoDB connection.');
        return dbClient;
    }

    console.log('Establishing new MongoDB connection...');
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        dbClient = { client, db: client.db() };
        return dbClient;
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        process.exit(1);
    }
}

export async function getDb() {
    if (!dbClient) {
        await connect();
    }
    return dbClient.db;
}
