import express from 'express';
const routes = express.Router();

// Express
import ExpressRouter from '@app/Router/ExpressRouter';

// Controllers
import { userController } from '@app/Factories/Controllers';


routes.post('/user/signup', ExpressRouter(userController.signup));
routes.post('/user/signin', ExpressRouter(userController.signin));


export default routes;