import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// Express
import express from 'express';
const app = express();

// Redis
import { RedisClient } from '@app/Repositories/Cache/Redis';
RedisClient.connect();

// Mids Import
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

// Routes
import routes from './routes';

// Mids and Setts
app.disable('x-powered-by');
app.use(express.json());
app.use(cors());
app.use(compression());
if (process.env.NODE_ENV == 'dev') {
    app.use(morgan('dev'));
}
app.use(routes);

app.listen(process.env.HTTP_PORT || 3333);

export default app;
