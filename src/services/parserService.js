import fs from 'fs';
import { getDb } from '../database.js';
import { downloadHTML } from '../helpers/download.js';
import { parseHTML } from '../helpers/parse.js';
import log4js from 'log4js';

log4js.configure('config/log4j.json');
const logger = log4js.getLogger();

export async function parseHtmlFromUrl(url) {
    const html = await downloadHTML(url);
    const jsonDocument = parseHTML(html);
    const db = await getDb(); // Get the persistent db instance
    try {
        const collection = db.collection('documents');
        const result = await collection.insertOne(jsonDocument);
        logger.info(`Document inserted into DB with ID: ${result.insertedId}`);

        fs.writeFileSync("output.json", JSON.stringify(jsonDocument, null, 2));
        logger.info("Document has been written to output.json");

        return { message: 'Document parsed and inserted', _id: result.insertedId };
    } finally {
        // No need to close client here as it's reused
    }
}
