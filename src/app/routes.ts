import express from 'express';
const routes = express.Router();

// Express
import ExpressRouter from '@app/Router/ExpressRouter';

// Controllers
import { defaultController } from '@app/Factories/Controllers';



routes.get('/', ExpressRouter(defaultController.index));


export default routes;