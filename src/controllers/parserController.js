import { parseHtmlFromUrl } from '../services/parserService.js';
import log4js from 'log4js';

log4js.configure('config/log4j.json');
const logger = log4js.getLogger();


// API endpoint for parsing an HTML document from a URL.
export async function parseUrl(req, res) {
    try {
        const { url } = req.body;
        if (!url) {
            logger.error('URL not passed');
            return res.status(400).send({ error: 'URL is required' });
        }
        const result = await parseHtmlFromUrl(url);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error in parseUrl:', error);
        logger.error('Error in parseUrl:', error);
        res.status(500).send({ error: 'Failed to process the request' });
    }
}
