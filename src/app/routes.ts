import express from 'express';
const routes = express.Router();

// Express
import ExpressRouter from '@app/Router/ExpressRouter';

// Controllers
import { userController } from '@app/Factories/Controllers';


routes.post('/user/signup', ExpressRouter(userController.signup));


export default routes;