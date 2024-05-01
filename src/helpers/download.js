import fetch from "node-fetch";
import log4js from 'log4js';

log4js.configure('config/log4j.json');
const logger = log4js.getLogger();

// Downloads HTML content from a given URL.
export async function downloadHTML(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    logger.error("Failed to fetch HTML:", error);
    throw error;
  }
}


