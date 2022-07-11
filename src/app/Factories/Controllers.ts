import {UserController} from '@app/controllers/User';
import TokenSession from '../Repositories/Session/TokenSession';


export const userController = new UserController(TokenSession);