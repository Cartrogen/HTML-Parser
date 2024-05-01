import express from 'express';
import { parseUrl } from '../controllers/parserController.js';

const router = express.Router();

router.post('/parse', parseUrl);

export default router;
