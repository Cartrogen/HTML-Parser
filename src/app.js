import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connect } from './database.js'; // Ensure the database is connected
import parserRoutes from './routes/parserRoutes.js';


const app = express();
const port = process.env.APP_PORT;
app.use(express.json());
app.use('/api', parserRoutes);

connect().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(error => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});
